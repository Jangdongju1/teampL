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
import {IssueStatus, KanbanBoardName, ModalType, ProjectStatus, ProjectType} from "../../common";
import {createIssueRequest, getPersonalIssueListRequest, patchDragIssueStatusRequest} from "../../api/issueApi";
import GetPersonalIssueListResponse from "../../interface/response/issue/getPersonalIssueListResponse";
import IssueModal from "../../component/modal/issueModal/issueModal";
import {modalStore} from "../../store";
import {DragDropContext, Draggable, DraggableLocation, Droppable, DropResult} from "react-beautiful-dnd";
import issueStatus from "../../common/enum/IssueStatus";
import IssueCard from "../../component/issueCard";
import CreateIssueRequest from "../../interface/request/issue/createIssueRequest";
import CreateIssueResponse from "../../interface/response/issue/createIssueResponse";
import kanbanBoardName from "../../common/enum/kanbanBoardName";
import {PatchIssueStatusDragRequest} from "../../interface/request";
import PatchIssueStatusDragResponse from "../../interface/response/issue/patchIssueStatusDragResponse";

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
            [KanbanBoardName.NOT_START]: false,
            [KanbanBoardName.ON_WORKING]: false,
            [KanbanBoardName.STUCK]: false,
            [KanbanBoardName.DONE]: false,
        });
    //* state : 각 칸반보드의 데이터 배열 상태
    const [eachKanbanIssues, setEachKanbanIssues] =
        useState<Record<string, Issue[]>>({
            [KanbanBoardName.NOT_START]: [],
            [KanbanBoardName.ON_WORKING]: [],
            [KanbanBoardName.STUCK]: [],
            [kanbanBoardName.DONE]: []
        })


    // accessToken
    const accessToken = cookies.accessToken_Main;

    // 칸반보드 타입 4가지에 대한 객체 배열 1)보드의이름, 2)상태값 ,3) 타이틀 컬러
    const boardType = () => {
        const types: { boardName: string, status: number, titleColor: string } [] = [
            {boardName: KanbanBoardName.NOT_START, status: IssueStatus.NOT_START, titleColor: "rgb(121, 126, 147)"},
            {boardName: KanbanBoardName.ON_WORKING, status: issueStatus.ON_WORKING, titleColor: "rgb(253, 188, 100)"},
            {boardName: KanbanBoardName.STUCK, status: IssueStatus.STUCK, titleColor: "rgb(232, 105, 125)"},
            {boardName: KanbanBoardName.DONE, status: IssueStatus.DONE, titleColor: "rgb(51, 211, 145)"}
        ]

        return types;
    }


    const sortIssue = (issues: Issue[], stat: number): Issue[] => {
        if (!issues) return [];

        const filteredIssue: Issue[] = issues.filter(item => item.stat === stat);

        // 이슈 맵 생성
        const issueMap: Map<string, Issue> =
            new Map<string, Issue>(filteredIssue.map(item => [item.issueSequence, item]));

        // 맨첫번째 노드
        let currentElement = filteredIssue.find(item => item.previousNode === null);


        if (!currentElement) return [];

        const viewArr: Issue[] = [];

        viewArr.push(currentElement);

        while (currentElement) {
            currentElement = currentElement.nextNode ? issueMap.get(currentElement.nextNode) : undefined;

            if (currentElement) {
                viewArr.push(currentElement);
            }

            if (!currentElement) break;
        }
        return viewArr;
    }


    //* function : 각 칸반보드의 상태값에 따른 이름 반환함수
    const getKanbanName = (stat: number): string => {
        const names: Record<string, string> = {
            "0": KanbanBoardName.NOT_START,
            "1": KanbanBoardName.ON_WORKING,
            "2": KanbanBoardName.STUCK,
            "3": KanbanBoardName.DONE
        }
        return names[String(stat)];
    }


    //* function : 개인프로젝트 이슈 목록 api 응답처리 함수.
    const getPersonalIssueResponse = (responseBody: GetPersonalIssueListResponse | ResponseDto | null) => {
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetPersonalIssueListResponse;

        // reduce함수는 결과를 축척하고 한꺼번에 반환해 준다. 따라서 forEach로 발생하는 불필요한 반복적 상태 업데이트를 줄일 수 있다.
        const updatedKanbanIssues = boardType().reduce((acc, item) => {
            acc[item.boardName] = sortIssue(data.list, item.status);
            return acc;
        }, {} as Record<string, Issue[]>); // 초기값은 빈 객체


        // 상태 업데이트
        setEachKanbanIssues(updatedKanbanIssues);

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

    //function : 이슈카드 드래그로 인한 요청 처리함수
    const patchDragIssueResponse = (responseBody: PatchIssueStatusDragResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
    }
    //function : 이슈카드 옮긴 후 상태 업데이트 함수
    const updateKanbanState = (sourceArr: Issue[], dstArr: Issue[] | null, srcBoardId: string, dstBoardId: string | null) => {


        if (dstArr && dstBoardId) {
            setEachKanbanIssues(prevState => ({
                ...prevState,
                [getKanbanName(parseInt(srcBoardId, 10))]: sourceArr,
                [getKanbanName(parseInt(dstBoardId, 10))]: dstArr
            }))
        } else {
            setEachKanbanIssues(prevState => ({
                ...prevState,
                [getKanbanName(parseInt(srcBoardId, 10))]: sourceArr
            }))
        }
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
    const onDragEnd = async (result: DropResult) => {
        if (!accessToken) return;
        const {source, destination, draggableId} = result;

        if (!source || !destination || !projectInfo?.projectNum) return;


        // 서버로 보낼 dst의 preNode와  nextNode를 구하는 함수
        const getNodes = (sourceInfo: DraggableLocation, dstInfo: DraggableLocation, draggableId: string) => {
            const result: { dstNextNode: string | null, dstPreNode: string | null } = {
                dstNextNode: null,
                dstPreNode: null
            };

            let dstIssues = eachKanbanIssues[getKanbanName(parseInt(dstInfo.droppableId, 10))];

            if (source.droppableId === dstInfo.droppableId) {
                dstIssues = dstIssues.filter(value => value.issueSequence != draggableId);
            }
            result.dstPreNode = dstInfo.index == 0 ? null : dstIssues[dstInfo.index - 1].issueSequence
            result.dstNextNode = dstInfo.index == dstIssues.length ? null : dstIssues[dstInfo.index].issueSequence

            return result;
        }

        const draggedIssue = eachKanbanIssues[getKanbanName(parseInt(source.droppableId, 10))][source.index];

        // //이동되는 이슈가 맨처음으로 이동되거나 맨 마지막으로 이동되는 경우를 따져야 한다.
        const requestBody: PatchIssueStatusDragRequest = {
            projectNum: projectInfo?.projectNum,
            issueNum: draggedIssue.issueNum,
            dstStat: parseInt(destination.droppableId, 10),
            dstNextNode: getNodes(source, destination, draggableId).dstNextNode,
            dstPreNode: getNodes(source, destination, draggableId).dstPreNode,
        }


        // 즉시 반영을 위한 상태변경
        const tSourceIssues = [...eachKanbanIssues[getKanbanName(parseInt(source.droppableId, 10))]];
        // 배열의복사
        const srcArr: Issue[] = tSourceIssues.map(value => ({...value}))


        if (source.droppableId !== destination.droppableId) {
            const tDstIssues = [...eachKanbanIssues[getKanbanName(parseInt(destination.droppableId, 10))]];
            const dstArr: Issue[] = tDstIssues.map(value => ({...value}));

            draggedIssue.stat = parseInt(destination.droppableId, 10);
            srcArr.splice(source.index, 1); // 소스에서 삭제
            dstArr.splice(destination.index, 0, draggedIssue); // 목적지에 추가

            // api 호출전 상태 업데이트
            updateKanbanState(srcArr, dstArr, source.droppableId, destination.droppableId);
        } else {
            if (source.index === destination.index) return;   // 같은위치에 놨을때 그냥 넘어가고

            const movedItem = srcArr.splice(source.index, 1)[0];// 처음위치에서 삭제를 하고 해당 요소를 반환
            srcArr.splice(destination.index, 0, movedItem);  // 해당 위치에 삽입.

            updateKanbanState(srcArr, null, source.droppableId, null);

        }


        const responseBody = await patchDragIssueStatusRequest(requestBody, accessToken);

        patchDragIssueResponse(responseBody);
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
                        setRefresh={setRefresh}
                        eachKanbanIssues={eachKanbanIssues}
                        setEachKanbanIssues={setEachKanbanIssues}/>
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

                            <div id={"kanban-board-panel-wrapper"} key={item.boardName}
                                 onMouseEnter={() => onKanbanPanelMouseEnterEventHandler(item.boardName)}
                                 onMouseLeave={() => onKanbanPanelMouseLeaveEventHandler(item.boardName)}>
                                <div className={"kanban-board-panel-name-box"}
                                     style={{backgroundColor: item.titleColor}}>


                                    <div className={"kanban-board-panel-name"}>
                                        {`${item.boardName} / ${eachKanbanIssues[item.boardName].length}`}
                                    </div>

                                    {addBtnRenderState[item.boardName] ?
                                        <div className={"icon kanban-board-add-icon kanban-item-add-icon"} style={{
                                            backgroundColor: item.titleColor
                                        }} onClick={() => onAddItemBtnClickEventHandler(item.status)}>
                                        </div>
                                        : null
                                    }

                                </div>

                                <Droppable droppableId={String(item.status)}>
                                    {provided => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}
                                             className={"kanban-board-panel-item-box"}>

                                            {eachKanbanIssues[item.boardName].map((item, index) => (

                                                <Draggable key={item.issueSequence} draggableId={item.issueSequence}
                                                           index={index}>
                                                    {provided1 => (
                                                        <div
                                                            ref={provided1.innerRef} {...provided1.draggableProps} {...provided1.dragHandleProps}>
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
                                            ))}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div> :

                    null
                }

            </div>
        </DragDropContext>
    )
}