import "./style.css";
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import SearchBar from "../searchBar/searchBar";
import {ModalType, ProjectStatus, ProjectType} from "../../common";
import {modalStore} from "../../store";

type KanbanTopCompProps = {
    isTeamPage: boolean,
    projectName: string,
    projectType: number,
    stat: number,
    // 상단 메뉴상태
    topMenuStat: string,
    setTopMenuStat: Dispatch<SetStateAction<"kanban" | "main">>
    fetchData: () => void;
}
export default function KanbanTopComponent(props: KanbanTopCompProps) {
    //* 칸반보드 관련 데이터 prop
    const {projectName, isTeamPage, projectType, stat, fetchData} = props;
    //* 칸반보드 상단 메뉴 상태 prop
    const {topMenuStat, setTopMenuStat} = props;
    //* global state : 모달 상태
    const {setIsModalOpen, setModalType} = modalStore();


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
    const getProjectStatus = (status: number) => {
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

    // eventHandler : 상단 home 메뉴 버튼 클릭 헨들러
    const onTopMenuBtnClickEventHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        const menuStat = e.currentTarget.dataset.value;
        if (menuStat === undefined) return;
        if (menuStat === "kanban" || menuStat == "main") {
            setTopMenuStat(menuStat);
        }
    }

    const onPrjDropdownBtnClickEventHandler = async () => {
        fetchData();

        setTimeout(() => {
            setModalType(ModalType.PROJECT_LIST);
            setIsModalOpen(true);
        }, 200); // 300ms (0.3초) 후에 실행
    }

    return (
        <div id={"kanban-board-comp-wrapper"}>
            <div className={"kanban-board-comp-option-container"}>
                <div className={"kanban-board-comp-option"}>
                    <div className={"kanban-board-comp-drop-down"} onClick={onPrjDropdownBtnClickEventHandler}>
                        <div className={"kanban-board-comp-project-name"}>{projectName}</div>
                        <div className={"icon kanban-board-comp-drop-down-icon folder-open-icon"}></div>
                    </div>
                </div>
            </div>

            <div className={"kanban-board-mode-btn-container"}>
                <div className={"kanban-board-mode-btn-box"}>
                    <ul className={"kanban-board-mode-btn"}>
                        <li data-value={"main"}
                            style={topMenuStat === "home" ? {backgroundColor: `rgba(0, 0, 0, 0.09)`} : {}}
                            onClick={onTopMenuBtnClickEventHandler}>
                            <span className={"icon kanban-home-icon home-icon"}></span>{"Main Table"}
                        </li>
                        <li data-value={"kanban"}
                            style={topMenuStat === "kanban" ? {backgroundColor: `rgba(0, 0, 0, 0.09)`} : {}}
                            onClick={onTopMenuBtnClickEventHandler}>

                            {"Kanban"}
                        </li>
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
                <SearchBar value={searchWordState}
                           onChange={onSearchBarChangeEventHandler}/>
            </div>
        </div>
    )
}