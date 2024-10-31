import "./style.css";
import {useState} from "react";

// 개시물 데이터 받아야함.
type KanbanBoardPanelProps = {
    boardName: string,
}

export default function KanbanBoardPanel({boardName}: KanbanBoardPanelProps) {

    //state: 마우스 호버상태
    const [isMouseHover, setIsMouseHover] = useState<boolean>(false);

    //* eventHandler:마우스 엔터 이벤트 헨들러
    const onMouseEnterEventHandler = () => {
        setIsMouseHover(true);
    }

    //* eventHandler:마우스 리브 이벤트 헨들러
    const onMouseLeaveEventHandler = () => {
        setIsMouseHover(false);
    }


    // 칸반보드 상태는 4가지가 있다. 1)Not Start 2)On Working, 3) Stuck 4) Done
    const boardTitleColor: { [key: string]: string } = {  // 객체 정의
        "Not Start": "rgb(121, 126, 147)",
        "On Working": "rgb(253, 188, 100)",
        "Stuck": "rgb(232, 105, 125)",
        "Done": "rgb(51, 211, 145)"
    }

    //* 칸반보드의 헤더 컬러를 가져오는 함수
    const getColor = (boardName: string): string | undefined => {
        return boardTitleColor[boardName] || undefined;
    }


    return (
        <div id={"kanban-board-panel-wrapper"} onMouseEnter={onMouseEnterEventHandler} onMouseLeave={onMouseLeaveEventHandler}>
            <div className={"kanban-board-panel-name-box"} style={{
                backgroundColor:
                    getColor(boardName) === undefined ? "" : getColor(boardName)
            }}>
                <div className={"kanban-board-panel-name"}>
                    {`${boardName} / 0`}
                </div>

                {isMouseHover && (
                    <div className={"icon kanban-board-add-icon kanban-item-add-icon"} style={{
                        backgroundColor: getColor(boardName) === undefined ?
                            "" : getColor(boardName)
                    }}>
                    </div>)}

            </div>
            <div className={"kanban-board-panel-item-box"}>

            </div>

        </div>
    )
}