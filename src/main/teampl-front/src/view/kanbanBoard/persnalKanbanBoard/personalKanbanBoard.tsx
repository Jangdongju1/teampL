import "./style.css";
import KanbanTopComponent from "../../../component/kanbanBoardTopComponent/kanbanTopComponent";
import KanbanBoardPanel from "../../../component/kanbanBoardPanal/kanbanBoardPanel";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {GetPersonalPrjInfoRequest} from "../../../interface/request";
import {getPersonalPrjInfoRequest} from "../../../api/projectApi";
import GetPersonalPrjInfoResponse from "../../../interface/response/getPersonalPrjInfoResponse";
import {ResponseDto} from "../../../interface/response";
import ResponseCode from "../../../common/responseCode";
import {Project} from "../../../interface/types";

type KanbanType = {
    isTeamKanban: boolean
}

export default function PersonalKanbanBoard(props : KanbanType) {
    // pros:칸반타입 >> 1)개인프로젝트 칸반보드 2) 팀프로젝트 칸반보드
    const {isTeamKanban} = props
    //* Path Variable : 프로젝트의 번호
    const {projectNum} = useParams();
    //* state: 쿠키상태
    const [cookies, setCookies] = useCookies();
    //* state: 프로젝트 상태
    const [projectInfo, setProjectInfo] = useState<Project | null>(null);

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

        const fetchData = async () => {
            const requestBody: GetPersonalPrjInfoRequest = {projectNum: parseInt(projectNum, 10)}
            const responseBody = await getPersonalPrjInfoRequest(requestBody, token);

            getPersonalPrjInfoResponse(responseBody);
        }

        fetchData();
    }, []);

    return (
        <div id={"kanban-board-wrapper"}>
            <div className={"kanban-board-top-container"}>
                <KanbanTopComponent isTeamPage={isTeamKanban}
                                    projectName={projectInfo ? projectInfo.projectName : ""}
                                    projectType={projectInfo ? projectInfo.projectType : -1}
                                    stat={projectInfo ? projectInfo.stat : -1}/>
            </div>
            <div className={"kanban-board-bottom-container"}>

                <div className={"kanban-board-box"}>
                    <KanbanBoardPanel boardName={"Not Start"}/>
                </div>
                <div className={"kanban-board-box"}>
                    <KanbanBoardPanel boardName={"On Working"}/>
                </div>
                <div className={"kanban-board-box"}>
                    <KanbanBoardPanel boardName={"Stuck"}/>
                </div>
                <div className={"kanban-board-box"}>
                    <KanbanBoardPanel boardName={"Done"}/>
                </div>

            </div>
        </div>
    )
}