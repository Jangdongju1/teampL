import "./style.css";
import KanbanTopComponent from "../../../component/kanbanBoardTopComponent/kanbanTopComponent";
import KanbanBoardPanel from "../../../component/kanbanBoardPanal/kanbanBoardPanel";

export default function PersonalKanbanBoard() {
    return (
        <div id={"kanban-board-wrapper"}>
            <div className={"kanban-board-top-container"}>
                <KanbanTopComponent isTeamPage={true}/>
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