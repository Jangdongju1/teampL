import "./style.css";
import KanbanTopComponent from "../../component/kanbanBoardTopComponent/kanbanTopComponent";
import KanbanBoardPanel from "../../component/kanbanBoardPanal/kanbanBoardPanel";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {getPersonalPrjInfoRequest} from "../../api/projectApi";
import GetPersonalPrjInfoResponse from "../../interface/response/project/personal/getPersonalPrjInfoResponse";
import {ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import {Issue, Project} from "../../interface/types";
import {IssueStatus, ModalType, ProjectStatus, ProjectType} from "../../common";
import {getPersonalIssueListRequest} from "../../api/issueApi";
import GetPersonalIssueListResponse from "../../interface/response/issue/getPersonalIssueListResponse";
import IssueModal from "../../component/modal/issueModal";
import {modalStore} from "../../store";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import issueStatus from "../../common/enum/IssueStatus";

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

    const [totalIssues, setTotalIssues] = useState<Issue[]>()


    //* state : 컴포넌트 리프레쉬 상태
    const [refresh, setRefresh] = useState<number>(1);

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

    //* function : 상태별 필터링
    const filterIssue = (array: Issue[], stat: number): Issue[] => {
        return array.filter(item => item.stat === stat);
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
                        {boardType().map((item, index) =>
                            <KanbanBoardPanel boardName={item.boardName}
                                              itemArray={totalIssues ? filterIssue(totalIssues, item.status) : []}
                                              stat={item.status}
                                              isTeamKanban={isTeamKanban}
                                              setRefresh={setRefresh}/>
                        )}
                    </div> :

                    null
                }

            </div>
        </DragDropContext>
    )
}