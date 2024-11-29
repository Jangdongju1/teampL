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
import {Issue, KanbanState, Project} from "../../interface/types";
import {IssueStatus, ModalType, ProjectStatus, ProjectType} from "../../common";
import {getPersonalIssueListRequest} from "../../api/issueApi";
import GetPersonalIssueListResponse from "../../interface/response/issue/getPersonalIssueListResponse";
import IssueModal from "../../component/modal/issueModal";
import {modalStore} from "../../store";
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


    useEffect(() => {
        const fetchProjectInfo = async () => {
            if (!accessToken || projectNum === undefined) return;
            const responseBody = await getPersonalPrjInfoRequest(projectNum, accessToken);

            getPersonalPrjInfoResponse(responseBody);

        }
        fetchProjectInfo();
    }, []);

    useEffect(() => {
        if (!accessToken || projectNum === undefined) return;

        const fetchIssueList = async () => {
            const responseBody = await getPersonalIssueListRequest(projectNum, accessToken);
            getPersonalIssueResponse(responseBody);
        }
        fetchIssueList();

    }, [refresh]);


    return (
        <div id={"kanban-board-wrapper"}>
            {isModalOpen && modalType === ModalType.ISSUE_INFO && (
                <IssueModal
                    isTeamModal={true}
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
                    <div className={"kanban-board-box"}>
                        <KanbanBoardPanel boardName={"Not Start"}
                                          itemArray={totalIssues ? filterIssue(totalIssues, IssueStatus.NOT_START) : []}
                                          stat={IssueStatus.NOT_START}
                                          isTeamKanban={isTeamKanban}

                                          setRefresh={setRefresh}/>
                    </div>

                    <div className={"kanban-board-box"}>
                        <KanbanBoardPanel boardName={"On Working"}
                                          itemArray={totalIssues ? filterIssue(totalIssues, IssueStatus.ON_WORKING) : []}
                                          stat={IssueStatus.ON_WORKING}
                                          isTeamKanban={isTeamKanban}

                                          setRefresh={setRefresh}/>
                    </div>

                    <div className={"kanban-board-box"}>
                        <KanbanBoardPanel boardName={"Stuck"}
                                          itemArray={totalIssues ? filterIssue(totalIssues, IssueStatus.STUCK) : []}
                                          stat={IssueStatus.STUCK}
                                          isTeamKanban={isTeamKanban}
                                          setRefresh={setRefresh}/>
                    </div>

                    <div className={"kanban-board-box"}>
                        <KanbanBoardPanel boardName={"Done"}
                                          itemArray={totalIssues ? filterIssue(totalIssues, IssueStatus.DONE) : []}
                                          stat={IssueStatus.DONE}
                                          isTeamKanban={isTeamKanban}
                                          setRefresh={setRefresh}/>
                    </div>
                </div> :

                <div></div>
            }

        </div>
    )
}