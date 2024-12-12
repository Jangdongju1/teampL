import "./style.css";
import KanbanTopComponent from "../../component/kanbanBoardTopComponent/kanbanTopComponent";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {getPersonalPrjInfoRequest} from "../../api/projectApi";
import GetPersonalPrjInfoResponse from "../../interface/response/project/personal/getPersonalPrjInfoResponse";
import {ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import {Issue, Project} from "../../interface/types";
import {IssueStatus, ModalType, ProjectStatus, ProjectType} from "../../common";
import {createIssueRequest, getPersonalIssueListRequest} from "../../api/issueApi";
import GetPersonalIssueListResponse from "../../interface/response/issue/getPersonalIssueListResponse";
import IssueModal from "../../component/modal/issueModal";
import {modalStore} from "../../store";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import issueStatus from "../../common/enum/IssueStatus";
import IssueCard from "../../component/issueCard";
import CreateIssueRequest from "../../interface/request/issue/createIssueRequest";
import CreateIssueResponse from "../../interface/response/issue/createIssueResponse";
import {MouseEvent} from "react";
import {findAllByAltText} from "@testing-library/react";

type KanbanType = {
    isTeamKanban: boolean
}

export default function KanbanBoard(props: KanbanType) {
    // pros:칸반타입 >> 1)개인프로젝트 칸반보드 2) 팀프로젝트 칸반보드
    const {isTeamKanban} = props
    //* 칸반보드 상단 메뉴 상태 1) main , 2) kanban  2가지가 있다.
    const [topMenu, setTopMenu] = useState<"kanban" | "main">("kanban");
    //* Path Variable : 프로젝트의 번호


    // global state: 모달상태
    const {isModalOpen, modalType} = modalStore();
    const {projectNum} = useParams();
    //* state: 쿠키상태
    const [cookies, setCookies] = useCookies();
    //* state: 프로젝트 상태
    const [projectInfo, setProjectInfo] = useState<Project | null>(null);
    //* 전체 이슈 데이터
    const [totalIssues, setTotalIssues] = useState<Issue[]>()
    //* state : 컴포넌트 리프레쉬 상태
    const [refresh, setRefresh] = useState<number>(1);
    //* state : 칸반보드 패널의 추가버튼 렌더링 상태
    const [addBtnRenderState, setAddBtnRenderState] =
        useState<Record<string, boolean>>({
            "Not Start": false,
            "On Working": false,
            "Stuck": false,
            "Done": false,
        });


    // accessToken
    const accessToken = cookies.accessToken_Main;

    // 칸반보드 타입 4가지에 대한 객체 배열
    const boardType = () => {
        const types: { boardName: string, status: number } [] = [
            {boardName: "Not Start", status: IssueStatus.NOT_START},
            {boardName: "On Working", status: issueStatus.ON_WORKING},
            {boardName: "Stuck", status: IssueStatus.STUCK},
            {boardName: "Done", status: IssueStatus.DONE}
        ]

        return types;
    }

    // 칸반보드 상태는 4가지가 있다. 1)Not Start 2)On Working, 3) Stuck 4) Done
    const boardTitleColor = (boardName: string) => {
        const colors: Record<string, string> = {
            "Not Start": "rgb(121, 126, 147)",
            "On Working": "rgb(253, 188, 100)",
            "Stuck": "rgb(232, 105, 125)",
            "Done": "rgb(51, 211, 145)"
        }
        return colors[boardName]
    }


    const sortIssue = (issues: Issue[], stat: number): Issue[] => {
        if (!totalIssues) return [];

        const filteredIssue: Issue[] = totalIssues.filter(item => item.stat === stat);

        // 이슈 맵 생성
        const issueMap: Map<string, Issue> =
            new Map<string, Issue>(filteredIssue.map(item => [item.issueSequence, item]));

        let currentElement = filteredIssue.find(item => item.previousNode === null);


        if (!currentElement) return [];

        const viewArr: Issue[] = [];

        viewArr.push(currentElement);

        while (currentElement) {
            currentElement = issueMap.get(currentElement.nextNode);
            if (currentElement) {
                viewArr.push(currentElement);
            }
            if (currentElement === null) break;
        }


        return viewArr.reverse();
    }

    //* function : 개인프로젝트 이슈 목록 api 응답처리 함수.
    const getPersonalIssueResponse = (responseBody: GetPersonalIssueListResponse | ResponseDto | null) => {
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetPersonalIssueListResponse;

        setTotalIssues(data.list);

    }


    //* function: 프로젝트 정보 api 응답 처리함수;
    const getPersonalPrjInfoResponse = (responseBody: GetPersonalPrjInfoResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;
        if (code != ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetPersonalPrjInfoResponse;
        setProjectInfo(data.projectInfo);
    }


    //function: 이슈 추가요청에 대한 응답처리함수.
    const createIssueResponse = async (responseBody: CreateIssueResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;
        if (code !== ResponseCode.SUCCESS) alert(message);

        const {data} = responseBody as CreateIssueResponse;


        setRefresh(prevState => prevState * -1);
    }


    //* eventHandler : 칸반보드 패널 마우스 이벤트
    const onKanbanPanelMouseEnterEventHandler = (boardName: string) => {
        setAddBtnRenderState(prevState => ({...prevState, [boardName]: true}))
    }


    //eventHandler : 칸반보드 패널 마우스 이벤트
    const onKanbanPanelMouseLeaveEventHandler = (boardName: string) => {
        setAddBtnRenderState(prevState => ({...prevState, [boardName]: false}));
    }

    //* eventHandler : 이슈카드 생성버튼 클릭 이벹트 헨들러
    const onAddItemBtnClickEventHandler = async (stat: number) => {
        const token = cookies.accessToken_Main;
        if (!token || projectNum === undefined) return;

        const projectNumVal = parseInt(projectNum, 10);
        const requestBody: CreateIssueRequest = {projectNum: projectNumVal, stat};
        const responseBody = await createIssueRequest(requestBody, token);


        await createIssueResponse(responseBody);
    }


    // eventHandler : 드래그 앤 드롭 이벤트가 끝나면 실행할 함수
    const onDragEnd = (result: DropResult) => {
        console.log(result);
    }


    useEffect(() => {
        const fetchProjectInfo = async () => {
            if (!accessToken || projectNum === undefined) return;
            const responseBody = await getPersonalPrjInfoRequest(projectNum, accessToken);

            getPersonalPrjInfoResponse(responseBody);

        }
        fetchProjectInfo();
    }, []);

    useEffect(() => {
        // api 호출없이도 totalIssues를 자식 컴포넌트로 보내서 리렌더링 되도록 바꿀 예정.
        if (!accessToken || projectNum === undefined) return;

        const fetchIssueList = async () => {
            const responseBody = await getPersonalIssueListRequest(projectNum, accessToken);
            getPersonalIssueResponse(responseBody);
        }
        fetchIssueList();
    }, [refresh]);


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div id={"kanban-board-wrapper"}>
                {isModalOpen && modalType === ModalType.ISSUE_INFO && (
                    <IssueModal
                        isTeamModal={isTeamKanban}
                        setRefresh={setRefresh}/>
                )}

                <div className={"kanban-board-top-container"}>
                    <KanbanTopComponent isTeamPage={isTeamKanban}
                                        projectName={projectInfo ? projectInfo.projectName : ""}
                                        projectType={projectInfo ? projectInfo.projectType : ProjectType.UNKNOWN}
                                        stat={projectInfo ? projectInfo.stat : ProjectStatus.UNKNOWN}
                                        topMenuStat={topMenu}
                                        setTopMenuStat={setTopMenu}/>
                </div>
                {topMenu === "kanban" ?
                    <div className={"kanban-board-bottom-container"}>

                        {boardType().map((item, index) => (

                            <div id={"kanban-board-panel-wrapper"}
                                 onMouseEnter={() => onKanbanPanelMouseEnterEventHandler(item.boardName)}
                                 onMouseLeave={() => onKanbanPanelMouseLeaveEventHandler(item.boardName)}>
                                <div className={"kanban-board-panel-name-box"}
                                     style={{backgroundColor: boardTitleColor(item.boardName)}}>


                                    <div className={"kanban-board-panel-name"}>
                                        {`${item.boardName} / 0`}
                                    </div>

                                    {addBtnRenderState[item.boardName] ?
                                        <div className={"icon kanban-board-add-icon kanban-item-add-icon"} style={{
                                            backgroundColor: boardTitleColor(item.boardName)
                                        }} onClick={() => onAddItemBtnClickEventHandler(item.status)}>
                                        </div>
                                        : null
                                    }

                                </div>

                                <Droppable droppableId={String(item.status)}>
                                    {provided => (
                                        <div ref={provided.innerRef} {...provided.droppableProps} className={"kanban-board-panel-item-box"}>

                                            {!totalIssues ? null :
                                                sortIssue(totalIssues, item.status).map((item, index) => (
                                                    <Draggable draggableId={item.issueSequence} index={index}>
                                                        {provided1 => (
                                                            <div ref={provided1.innerRef} {...provided1.draggableProps} {...provided1.dragHandleProps}>
                                                                <IssueCard
                                                                    key={item.issueSequence}
                                                                    data={item}
                                                                    subIssueCnt={0}
                                                                    commentCnt={0}
                                                                    isTeamKanban={isTeamKanban}
                                                                    setRefresh={setRefresh}/>
                                                            </div>

                                                        )}
                                                    </Draggable>
                                                    // <IssueCard
                                                    //     key={item.issueSequence}
                                                    //     data={item}
                                                    //     subIssueCnt={0}
                                                    //     commentCnt={0}
                                                    //     isTeamKanban={isTeamKanban}
                                                    //     setRefresh={setRefresh}/>
                                                ))}
                                        </div>
                                    )}
                                </Droppable>
                                {/*<div className={"kanban-board-panel-item-box"}>*/}

                                {/*    {!totalIssues ? null :*/}
                                {/*        sortIssue(totalIssues, item.status).map((item, index) => (*/}
                                {/*            <IssueCard*/}
                                {/*                key={item.issueSequence}*/}
                                {/*                data={item}*/}
                                {/*                subIssueCnt={0}*/}
                                {/*                commentCnt={0}*/}
                                {/*                isTeamKanban={isTeamKanban}*/}
                                {/*                setRefresh={setRefresh}/>*/}
                                {/*        ))}*/}
                                {/*</div>*/}
                            </div>
                        ))}
                    </div> :

                    null
                }

            </div>
        </DragDropContext>
    )
}