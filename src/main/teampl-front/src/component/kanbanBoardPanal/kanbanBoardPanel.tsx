import "./style.css";
import {useState} from "react";
import {Issue} from "../../interface/types";
import {useCookies} from "react-cookie";
import {createIssueRequest} from "../../api/issueApi";
import CreateIssueResponse from "../../interface/response/createIssueResponse";
import {ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/responseCode";
import {useParams} from "react-router-dom";
import CreateIssueRequest from "../../interface/request/createIssueRequest";

// 개시물 데이터 받아야함.
type KanbanBoardPanelProps = {
    boardName: string,
    itemArray: Issue[],
    stat: number;
}

export default function KanbanBoardPanel(props: KanbanBoardPanelProps) {
    //* 칸반보드에 대응하는 이슈의 상태를 나타냄
    const {stat} = props
    //각각 보드의 이름이랑  데이터배열
    const {boardName, itemArray} = props;
    //state: 마우스 호버상태
    const [isMouseHover, setIsMouseHover] = useState<boolean>(false);
    //sate : 쿠키상태
    const [cookies, setCookies] = useCookies();
    //path variable
    const {projectNum} = useParams();


    //function: 이슈 추가요청에 대한 응답처리함수.
    const createIssueResponse = (responseBody:CreateIssueResponse | ResponseDto | null)=>{
        if (!responseBody) return;
        const {code,message} = responseBody as ResponseDto;
        if (code !== ResponseCode.SUCCESS) alert(message);
    }

    //* eventHandler:마우스 엔터 이벤트 헨들러
    const onMouseEnterEventHandler = () => {
        setIsMouseHover(true);
    }

    //* eventHandler:마우스 리브 이벤트 헨들러
    const onMouseLeaveEventHandler = () => {
        setIsMouseHover(false);
    }

    //* eventHandler: 이슈카드 생성버튼 클릭 이벹트 헨들러
    const onAddItemBtnClickEventHandler = async ()=>{
        const token = cookies.accessToken_Main;
        if (!token || projectNum === undefined) return;

        const projectNumVal = parseInt(projectNum,10);
        const requestBody : CreateIssueRequest = {projectNum:projectNumVal,stat};
        const responseBody = await createIssueRequest(requestBody,token);

        createIssueResponse(responseBody);
    }


    // 칸반보드 상태는 4가지가 있다. 1)Not Start 2)On Working, 3) Stuck 4) Done
    const boardTitleColor: { [key: string]: string } = {  // 객체 정의
        "Not Start": "rgb(121, 126, 147)",
        "On Working": "rgb(253, 188, 100)",
        "Stuck": "rgb(232, 105, 125)",
        "Done": "rgb(51, 211, 145)"
    }

    //* 칸반보드의 헤더 컬러를 가져오는 함수
    const getColor = (boardName: string): string => {
        return boardTitleColor[boardName];
    }

    return (
        <div id={"kanban-board-panel-wrapper"} onMouseEnter={onMouseEnterEventHandler}
             onMouseLeave={onMouseLeaveEventHandler}>
            <div className={"kanban-board-panel-name-box"} style={{
                backgroundColor:
                    getColor(boardName) === undefined ? "" : getColor(boardName)
            }}>
                <div className={"kanban-board-panel-name"}>
                    {`${boardName} / 0`}
                </div>

                {isMouseHover && (
                    <div className={"icon kanban-board-add-icon kanban-item-add-icon"} style={{
                        backgroundColor: !getColor(boardName) ?
                            "" : getColor(boardName)
                    }} onClick={onAddItemBtnClickEventHandler}>
                    </div>)}

            </div>
            <div className={"kanban-board-panel-item-box"}>
                {!itemArray ? <></> :
                    itemArray.map((item, index) =>
                        <div></div>)
                }
            </div>

        </div>
    )
}