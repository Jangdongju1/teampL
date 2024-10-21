import "./style.css";
import KanbanTopComponent from "../../../component/kanbanBoardTopComponent/kanbanTopComponent";

export default function PersonalKanbanBoard() {
    return (
        <div id={"kanban-board-wrapper"}>
            <div className={"kanban-board-top-container"}>
                <KanbanTopComponent isTeamPage={true}/>
            </div>
            <div className={"kanban-board-bottom-container"}>

                <div className={"kanban-board-box"}></div>
                <div className={"kanban-board-box"}></div>
                <div className={"kanban-board-box"}></div>
                <div className={"kanban-board-box"}></div>

            </div>
        </div>
    )
}