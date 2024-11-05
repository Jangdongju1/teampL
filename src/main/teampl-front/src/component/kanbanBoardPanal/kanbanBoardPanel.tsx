import "./style.css";
import {ForwardedRef, useRef, useState} from "react";
import {Issue} from "../../interface/types";
import {useCookies} from "react-cookie";
import {createIssueRequest, getPersonalIssueByStatus} from "../../api/issueApi";
import CreateIssueResponse from "../../interface/response/issue/personal/createIssueResponse";
import {ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import {useParams} from "react-router-dom";
import CreateIssueRequest from "../../interface/request/issue/personal/createIssueRequest";
import IssueCard from "../issueCard";
import GetPersonalIssueListResponse from "../../interface/response/issue/personal/getPersonalIssueListResponse";

// 개시물 데이터 받아야함.
type KanbanBoardPanelProps = {
    boardName: string,
    itemArray: Issue[],
    setArray: (newArray: Issue[]) => void,
    stat: number,
    isTeamKanban: boolean
}

export default function KanbanBoardPanel(props: KanbanBoardPanelProps) {
    //* 칸반보드에 대응하는 이슈의 상태를 나타냄
    const {stat, isTeamKanban} = props
    //각각 보드의 이름이랑  데이터배열
    const {boardName, itemArray, setArray} = props;
    //sate : 쿠키상태
    const [cookies, setCookies] = useCookies();
    //path variable
    const {projectNum} = useParams();
    // state : 생성된 이슈카드 시퀀스 상태
    const [sequence, setSequence] = useState<string>("");
    //* 이슈카드 ref
    const issueCardRefs = useRef<(HTMLTextAreaElement | null)[]>([]);


    //*function : ref에 따른 이슈카드 정렬
    const sortIssue = (issues: Issue[]): Issue[] => {
        if (issues.length === 0) return [];

        const sortedIssue: Issue[] = [];  // 정렬된 이슈들

        // 해시맵에 넣는 방법이 신박함
        // key:issueSequence  value : IssueObj
        const issueMap: Map<string, Issue> = new Map<string, Issue>(issues.map(issue => [issue.issueSequence, issue]));

        // 맨 첫번째 엘리먼트를 찾고
        let currentElement: Issue | undefined = issues.reduce((previousValue, currentValue) => {
            return currentValue.issueNum < previousValue.issueNum ? currentValue : previousValue;
        }, issues[0]);

        // currentElement가 undefined일 경우 처리
        if (!currentElement) return [];

        if (!currentElement.ref) {
            sortedIssue.push(currentElement);
            return sortedIssue;
        }

        const firstElement: Issue | undefined = issues.find(issue => !issue.ref);

        if (firstElement !== undefined) {
            sortedIssue.push(firstElement);
        }

        // ref 참조 값으로 다음엘리먼트를 순차적으로 배열에 넣은뒤 반환.
        while (currentElement) {
            if (currentElement.ref) {
                sortedIssue.push(currentElement);
            }
            currentElement = issueMap.get(currentElement.ref);
            if (!currentElement) break;
        }

        return sortedIssue;
    }


    //function: 이슈 추가요청에 대한 응답처리함수.
    const createIssueResponse = (responseBody: CreateIssueResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;
        if (code !== ResponseCode.SUCCESS) alert(message);

        const {data} = responseBody as CreateIssueResponse;
        setSequence(data.sequence);
    }


    //* eventHandler: 이슈카드 생성버튼 클릭 이벹트 헨들러
    const onAddItemBtnClickEventHandler = async () => {
        const token = cookies.accessToken_Main;
        if (!token || projectNum === undefined) return;

        const projectNumVal = parseInt(projectNum, 10);
        const requestBody: CreateIssueRequest = {projectNum: projectNumVal, stat};
        const responseBody = await createIssueRequest(requestBody, token);

        // 응답처리
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
        <div id={"kanban-board-panel-wrapper"}>
            <div className={"kanban-board-panel-name-box"} style={{
                backgroundColor:
                    getColor(boardName) === undefined ? "" : getColor(boardName)
            }}>
                <div className={"kanban-board-panel-name"}>
                    {`${boardName} / 0`}
                </div>

                <div className={"icon kanban-board-add-icon kanban-item-add-icon"} style={{
                    backgroundColor: !getColor(boardName) ?
                        "" : getColor(boardName)
                }} onClick={onAddItemBtnClickEventHandler}>
                </div>

            </div>
            <div className={"kanban-board-panel-item-box"}>
                {!itemArray ? <></> :
                    sortIssue(itemArray).map((item, index) =>
                        <IssueCard
                            key={item.issueSequence}
                            data={item}
                            subIssueCnt={0}
                            commentCnt={0}
                            isTeamKanban={isTeamKanban}
                            isTitleChange={item.issueSequence === sequence}/>)
                }
            </div>

        </div>
    )
}