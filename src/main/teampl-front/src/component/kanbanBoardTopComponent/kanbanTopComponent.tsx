import "./style.css";
import {ChangeEvent, useState} from "react";
import SearchBar from "../searchBar/searchBar";
import {ProjectType, ProjectStatus} from "../../common";

type KanbanTopCompProps = {
    isTeamPage: boolean,
    projectName: string,
    projectType: number,
    stat: number
}
export default function KanbanTopComponent(props: KanbanTopCompProps) {
    const {projectName, isTeamPage, projectType, stat} = props;

    //* object: 프로젝트에 대한 타입 객체 정의
    const projectTypeDesc: Record<number, string> = {
        [ProjectType.PERSONAL_PROJECT]: "Personal",
        [ProjectType.TEAM_PROJECT]: "Team",
        [ProjectType.UNKNOWN]: ""
    }

    //* object: 프로젝트 상태에 대한 타입 객체 정의
    const projectStatus: Record<number, string> = {
        [ProjectStatus.UNKNOWN]: "",
        [ProjectStatus.DONE]: "Down",
        [ProjectStatus.ON_WORKING]: "On Working"
    }


    //* function : 프로젝트 타입을 얻어오는 함수
    const getProjectType = (type: number): string => {
        if (type === undefined) return "";
        return projectTypeDesc[type];
    }

    //* function : 프로젝트  상태를 얻어오는 함수
    const getProjectStatus= (status:number)=>{
        if (status === undefined) return "";
        return projectStatus[status];
    }



    //state : 인풋 엘리먼트 상태
    const [searchWordState, setSearchWordState] = useState<string>("");


    //eventHandler: 검색바 변경이벤트 처리 헨들러
    const onSearchBarChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchWordState(value);
    }

    return (
        <div id={"kanban-board-comp-wrapper"}>
            <div className={"kanban-board-comp-option-container"}>
                <div className={"kanban-board-comp-option"}>
                    <div className={"kanban-board-comp-drop-down"}>
                        <div className={"kanban-board-comp-project-name"}>{projectName}</div>
                        <div className={"icon kanban-board-comp-drop-down-icon folder-open-icon"}></div>
                    </div>
                </div>
            </div>

            <div className={"kanban-board-mode-btn-container"}>
                <div className={"kanban-board-mode-btn-box"}>
                    <ul className={"kanban-board-mode-btn"}>
                        <li><span className={"icon kanban-home-icon home-icon"}></span>{"Main Table"}</li>
                        <li>{"Kanban"}</li>
                        {isTeamPage ?
                            <li><span className={"icon participant-icon people-icon"}></span>{"Participants"}</li> : ''}

                    </ul>
                </div>

                <div className={"kanban-board-project-status-box"}>
                    <div className={"kanban-board-project-type-title"}>
                        {"Project Type:"}
                        <span className={"kanban-board-project-type"}>{getProjectType(projectType)}</span>
                    </div>

                    <div className={"kanban-board-project-status"}>
                        <div className={"kanban-board-project-status-title"}>{"Status:"}</div>
                        <div className={"kanban-board-project-status-value"}>{getProjectStatus(stat)}</div>
                    </div>

                    <div className={"icon kanban-board-project-desc-icon description-icon"}/>
                </div>


            </div>


            <div className={"divider2"}></div>
            <div className={"kanban-board-etc-container"}>
                <SearchBar value={searchWordState} onChange={onSearchBarChangeEventHandler}/>
            </div>
        </div>
    )
}