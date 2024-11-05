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
import {IssueStatus} from "../../common";
import {getPersonalIssueListRequest} from "../../api/issueApi";
import GetPersonalIssueListResponse from "../../interface/response/issue/personal/getPersonalIssueListResponse";

type KanbanType = {
    isTeamKanban: boolean
}

export default function KanbanBoard(props: KanbanType) {
    // pros:칸반타입 >> 1)개인프로젝트 칸반보드 2) 팀프로젝트 칸반보드
    const {isTeamKanban} = props
    //* 칸반보드 상단 메뉴 상태 1) main , 2) kanban  2가지가 있다.
    const [topMenu, setTopMenu] = useState<string>("kanban");
    //* Path Variable : 프로젝트의 번호

    const {projectNum} = useParams();
    //* state: 쿠키상태
    const [cookies, setCookies] = useCookies();
    //* state: 프로젝트 상태
    const [projectInfo, setProjectInfo] = useState<Project | null>(null);


    //* 전체 IssueCard상태
    const [totalIssues, setTotalIssues] = useState<Issue[]>([]);
    // 4개의 칸반보드 상태.
    //* state : 칸반보드(Not Start) 상태
    const [notStartState, setNotStartState] = useState<Issue[]>([]);
    //* state : 칸반보드(On Working) 상태
    const [onWorkingState, setOnWorkingState] = useState<Issue[]>([]);
    //* state : 칸반보드(Stuck) 상태
    const [stuckState, setStuckState] = useState<Issue[]>([]);
    //* state : 칸반보드(Done)상태
    const [doneState, setDoneState] = useState<Issue[]>([]);



    //* function : 상태별 필터링
    const filterIssue = (array: Issue[], stat: number): Issue[] => {
        return array.filter(item => item.stat === stat);
    }
    //* function : 상태별 이슈 세팅
    const setIssueArray = (array: Issue[]) => {
        const states: KanbanState[] = [
            {status: IssueStatus.NOT_START, setState: setNotStartState},
            {status: IssueStatus.ON_WORKING, setState: setOnWorkingState},
            {status: IssueStatus.STUCK, setState: setStuckState},
            {status: IssueStatus.DONE, setState: setDoneState}
        ]

        states.forEach(({status, setState}) => {
            const issues: Issue[] = filterIssue(array, status);
            setState(issues);
        });

    }

    //* function : 개인프로젝트 이슈 목록 api 응답처리 함수.
    const getPersonalIssueResponse = (responseBody: GetPersonalIssueListResponse | ResponseDto | null) => {
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetPersonalIssueListResponse;
        setTotalIssues(data.list)
        setIssueArray(data.list);
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

    //* useEffect : 마운트시 실행할 함수 1)프로젝트 관련 정보 api 호출
    useEffect(() => {
        const token = cookies.accessToken_Main;
        if (!token || projectNum === undefined) return;

        const fetchProjectInfo = async () => {
            const responseBody = await getPersonalPrjInfoRequest(projectNum, token);

            getPersonalPrjInfoResponse(responseBody);
        }

        const fetchIssueList = async () => {
            const responseBody = await getPersonalIssueListRequest(projectNum, token);
            getPersonalIssueResponse(responseBody);
        }

        fetchProjectInfo();
        fetchIssueList();
    }, [totalIssues]);

    return (
        <div id={"kanban-board-wrapper"}>
            <div className={"kanban-board-top-container"}>
                <KanbanTopComponent isTeamPage={isTeamKanban}
                                    projectName={projectInfo ? projectInfo.projectName : ""}
                                    projectType={projectInfo ? projectInfo.projectType : -1}
                                    stat={projectInfo ? projectInfo.stat : -1}
                                    topMenuStat={topMenu}
                                    setTopMenuStat={setTopMenu}/>
            </div>
            {topMenu === "kanban" ?
                <div className={"kanban-board-bottom-container"}>
                    <div className={"kanban-board-box"}>
                        <KanbanBoardPanel boardName={"Not Start"} itemArray={notStartState}
                                          stat={IssueStatus.NOT_START}
                                          setArray={setNotStartState}
                                          isTeamKanban={isTeamKanban}/>
                    </div>

                    <div className={"kanban-board-box"}>
                        <KanbanBoardPanel boardName={"On Working"} itemArray={onWorkingState}
                                          stat={IssueStatus.ON_WORKING}
                                          setArray={setOnWorkingState}
                                          isTeamKanban={isTeamKanban}/>
                    </div>

                    <div className={"kanban-board-box"}>
                        <KanbanBoardPanel boardName={"Stuck"}
                                          itemArray={stuckState}
                                          stat={IssueStatus.STUCK}
                                          setArray={setStuckState}
                                          isTeamKanban={isTeamKanban}/>
                    </div>

                    <div className={"kanban-board-box"}>
                        <KanbanBoardPanel boardName={"Done"}
                                          itemArray={doneState}
                                          stat={IssueStatus.DONE}
                                          setArray={setDoneState}
                                          isTeamKanban={isTeamKanban}/>
                    </div>
                </div> :

                <div></div>
            }

        </div>
    )
}