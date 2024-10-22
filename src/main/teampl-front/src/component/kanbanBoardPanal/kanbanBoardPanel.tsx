import "./style.css";

// 개시물 데이터 받아야함.
type KanbanBoardPanelProps = {
    boardName: string,
}

export default function KanbanBoardPanel({boardName}: KanbanBoardPanelProps) {

    // 칸반보드 상태는 4가지가 있다. 1)Not Start 2)On Working, 3) Stuck 4) Done
    const boardTitleColor: { [key: string]: string } = {  // 객체 정의
        "Not Start": "rgb(121, 126, 147)",
        "On Working": "rgb(253, 188, 100)",
        "Stuck": "rgb(232, 105, 125)",
        "Done": "rgb(51, 211, 145)"
    }

    const getColor = (boardName: string): string | undefined => {
        return boardTitleColor[boardName] || undefined;
    }


    return (
        <div id={"kanban-board-panel-wrapper"}>
            <div className={"kanban-board-panel-name-box"} style={{backgroundColor:
                    getColor(boardName) === undefined? "" : getColor(boardName)}}>
                <div className={"kanban-board-panel-name"}>
                    {`${boardName} / 0`}
                </div>
            </div>
            <div className={"kanban-board-panel-item-box"}>

            </div>

        </div>
    )
}