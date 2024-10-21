import "./style.css";
import {ChangeEvent, useState} from "react";
import SearchBar from "../searchBar/searchBar";

type KanbanTopCompProps ={
    isTeamPage : boolean
}
export default function KanbanTopComponent({isTeamPage} : KanbanTopCompProps) {
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
                        <div className={"kanban-board-comp-project-name"}>{"테스트 프로젝트"}</div>
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
                            <li><span className={"icon participant-icon people-icon"}></span>{"Participants"}</li>: ''}

                    </ul>
                </div>
            </div>
            <div className={"divider2"}></div>
            <div className={"kanban-board-etc-container"}>
                <SearchBar value={searchWordState} onChange={onSearchBarChangeEventHandler}/>
            </div>
        </div>
    )
}