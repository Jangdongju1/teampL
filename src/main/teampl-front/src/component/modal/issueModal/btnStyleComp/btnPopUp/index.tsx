import "./style.css"
import {IssueCategory, IssuePriority, IssueStatus, KanbanBoardName} from "../../../../../common";
import {IssueCategories, IssuePriorities, IssueStats} from "../../../../../constant/issueConstants";
import React, {useEffect, useRef} from "react";
import {useCookies} from "react-cookie";
import PatchIssuePriorityResponse from "../../../../../interface/response/issue/patchIssuePriorityResponse";
import {
    PatchIssueCategoryResponse,
    PatchIssueInChargeResponse,
    PatchIssueStatusResponse,
    ResponseDto
} from "../../../../../interface/response";
import responseCode from "../../../../../common/enum/responseCode";
import ResponseCode from "../../../../../common/enum/responseCode";
import {useParams} from "react-router-dom";
import {issueStore} from "../../../../../store";
import {
    PatchIssueCategoryRequest, PatchIssueInChargeRequest,
    PatchIssueStatusRequest,
    PatchPriorityRequest
} from "../../../../../interface/request";
import {
    patchCategoryRequest,
    patchIssueInChargeRequest,
    patchPriorityRequest,
    patchStatusRequest
} from "../../../../../api/issueApi";
import {Issue, Team, TeamMember} from "../../../../../interface/types";
import InitialsImg from "../../../../InitialsImg";


type BtnPopUpProps = {
    menu: IssueCategory[] | IssuePriority[] | IssueStatus[] | TeamMember[],
    cssOption?: {
        offset?: {
            top?: number,
            bottom?: number,
            right?: number,
            left?: number
        }
        size?: {
            width?: number,
            height?: number
        }
    },
    hooks: {
        setPopUpClickState: React.Dispatch<React.SetStateAction<boolean>>,
        value: number | string
        setValue: React.Dispatch<React.SetStateAction<number | string>>,
        eachKanbanIssues?: Record<string, Issue[]>,
        // setEachKanbanIssues?: React.Dispatch<React.SetStateAction<Record<string, Issue[]>>>
        setEachKanbanIssues?: (newValue: Record<string, Issue[]>) => void;
    }

    popupType: "category" | "priority" | "status" | "inCharge"
}
export default function BtnPopUp(props: BtnPopUpProps) {
    // 값과 관련된 prop
    const {menu, cssOption, popupType, hooks} = props;
    // 상태 변경과 관련되 props
    const {
        setPopUpClickState,
        setValue,
        value,
        eachKanbanIssues,
        setEachKanbanIssues
    } = hooks

    // path variable : 프로젝트 넘버 (api 호출시 요청 변수)
    const {projectNum} = useParams();
    // global state  : 이슈넘버 (api 호출시 요청변수)
    const {issueNum} = issueStore();

    // cssOption이 undefined일 경우에 빈객체를 반환한다.
    // 자바에서는 오로지 논리연산자로만 사용되는 || 이지만 Js에서는 좀더 다양하게 쓰이는듯 예를들면 값의 존재여부
    // 확인을 위해서 쓸 수 있다.
    const offset = cssOption?.offset || {};
    const size = cssOption?.size || {}


    // ref : 외부 외부 클릭 감지용 ref
    const popUpRef = useRef<HTMLDivElement>(null);

    //  쿠키 확인
    const [cookies] = useCookies();

    const accessToken = cookies.accessToken_Main;

    const getMenu = () => {
        if (popupType === "status" || popupType === "category" || popupType == "priority")
            return menu as IssueCategory[] | IssuePriority[] | IssueStatus[];
        else if (popupType === "inCharge")
            return menu as TeamMember[];

        return [];
    }

    // function : popupType이 status인 경우 option의 css
    const optionStyle = (value: number | string): {
        optionName: string,
        background: { backgroundColor: string | undefined, color: string | undefined }
    } => {


        const defaultVal = {optionName: "", background: {backgroundColor: undefined, color: undefined}};


        // 스타일 반환함수
        const getStyle = (type: "status" | "category" | "priority", value: number) => {
            if (type === "status") {
                return IssueStats[value.toString()];
            } else if (type === "category") {
                return IssueCategories[value.toString()];
            } else if (type === "priority") {
                return IssuePriorities[value.toString()]
            }

            return undefined;
        }

        if (popupType === "status") {
            const style = getStyle(popupType, value as number) as { text: string, color: string };
            if (!style) return defaultVal;
            const color = value > IssueStatus.NOT_START ? "rgba(255,255,255,1)" : undefined;

            return {optionName: style.text, background: {backgroundColor: style.color, color: color}}
        } else if (popupType === "category") {
            const optionName = getStyle(popupType, value as number) as string;
            return {optionName: optionName, background: {backgroundColor: undefined, color: undefined}}
        } else if (popupType === "priority") {
            const style = getStyle(popupType, value as number) as { text: string, color: string };
            if (!style) return defaultVal;
            const color = value > IssuePriority.NORMAL ? "rgba(255,255,255,1)" : undefined;

            return {optionName: style.text, background: {backgroundColor: style.color, color: color}};
        }


        return defaultVal;
    }

    // function: 카테고리 변경에 대한 응답 처리 함수.
    const patchCategoryResponse = (responseBody: PatchIssueCategoryResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
    }

    // function: 상태 변경에 대한 응답 처리 함수.
    const patchStatusResponse = (responseBody: PatchIssueStatusResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

    }

    // function: 우선 순위 수정에 대한 응답 처리 함수.
    const patchPriorityResponse = (responseBody: PatchIssuePriorityResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;
        if (code !== responseCode.SUCCESS) {
            alert(message);
            return;
        }
        //  setRefresh(prevState => prevState * -1);
    }
    // function : 담당자 수정요청에 대한 응답처리
    const patchIssueInChargeResponse = (responseBody: PatchIssueInChargeResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code,message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS){
            alert(message)
            return;
        }
    }
    // function : 각 칸반보드의 이름을 반환해주는 함수
    const kanbanName = (status: number) => {
        const names: Record<string, string> = {
            [IssueStatus.NOT_START]: KanbanBoardName.NOT_START,
            [IssueStatus.ON_WORKING]: KanbanBoardName.ON_WORKING,
            [IssueStatus.STUCK]: KanbanBoardName.STUCK,
            [IssueStatus.DONE]: KanbanBoardName.DONE
        }

        return names[String(status)];
    }
    // function : 칸반보드 상태 업데이트
    const updateKanbanState = (newValue: number) => {
        if (popupType === "status") {
            if (eachKanbanIssues) {
                const srcArr = eachKanbanIssues[kanbanName(value as number)].map(issue => ({...issue}));
                const dstArr = eachKanbanIssues[kanbanName(newValue)].map(issue => ({...issue}));

                const moveIssue = srcArr.find(issue => issue.issueNum === issueNum);

                if (moveIssue) {
                    const updateSrcArr = srcArr.filter(issue => issue.issueNum !== issueNum);
                    if (dstArr.length !== 0) {
                        const firstDstIssue = dstArr[0];
                        moveIssue.nextNode = firstDstIssue.issueSequence;
                        firstDstIssue.previousNode = moveIssue.issueSequence;
                    }
                    const updateDstArr = [moveIssue, ...dstArr];


                    const updateEachIssues = {
                        ...eachKanbanIssues,
                        [kanbanName(value as number)]: updateSrcArr,
                        [kanbanName(newValue)]: updateDstArr
                    }
                    if (setEachKanbanIssues) setEachKanbanIssues(updateEachIssues);
                }
            }
        } else if (popupType === "priority") {
            if (eachKanbanIssues) {

                const stat = Object.keys(eachKanbanIssues).reduce((result, kanbanKey) => {
                    const issue = eachKanbanIssues[kanbanKey].find(issue => issue.issueNum === issueNum);

                    if (issue) {
                        result = issue.stat;
                    }
                    return result;
                }, -1);

                if (stat === -1) return;


                const updateIssues = {
                    ...eachKanbanIssues,
                    [kanbanName(stat)]: eachKanbanIssues[kanbanName(stat)]
                        .map(issue => issue.issueNum === issueNum ? {...issue, priority: newValue} : issue)
                }

                if (setEachKanbanIssues) setEachKanbanIssues(updateIssues);

            }

        }

    }

    // eventHandler: 외부클릭 감지 함수
    const handleClickOutside = (e: MouseEvent) => {
        if (popUpRef.current &&
            !popUpRef.current.contains(e.target as Node) &&  // 자기자신 이외의 요소를 클릭하거나
            !popUpRef.current.previousSibling?.contains(e.target as Node)) { // 자신의 이전 형제가 아닌곳을 클릭하면 닫힘
            setPopUpClickState(false);
        }
    }

    // eventHandler: option 클릭 이벤트 헨들러
    const onOptionClickEventHandler = async (newValue: number | TeamMember) => {
        if (!accessToken) {
            alert("accessToken is expired!!");
            return;
        }
        // 이슈넘버와 프로젝트 넘버가 없는 경우
        if (!issueNum || !projectNum) return;

        if (value === newValue) {  // 기존의 값과 같은 값을 선택하는 경우에는 api 요청을 보낼 필요가 없음
            setPopUpClickState(false);
            return;
        }


        //  type 별 api호출
        if (popupType === "priority") {
            // 우선순위 변경시 api호출
            const requestBody: PatchPriorityRequest = {
                projectNum: parseInt(projectNum, 10),
                issueNum: issueNum,
                priority: newValue as number
            }

            updateKanbanState(newValue as number);
            const responseBody = await patchPriorityRequest(requestBody, accessToken);
            patchPriorityResponse(responseBody);

        } else if (popupType === "status") {

            if (value === newValue) return;
            // 이슈 상태 변경시 api 호출
            const requestBody: PatchIssueStatusRequest = {
                projectNum: parseInt(projectNum, 10),
                issueNum,
                stat: newValue as number
            };
            updateKanbanState(newValue as number);
            const responseBody = await patchStatusRequest(requestBody, accessToken);
            patchStatusResponse(responseBody);

        } else if (popupType === "category") {
            // 카테고리 변경시 api 호출.
            const requestBody: PatchIssueCategoryRequest =
                {projectNum: parseInt(projectNum, 10), issueNum, category: newValue as number};

            const responseBody = await patchCategoryRequest(requestBody, accessToken);

            patchCategoryResponse(responseBody);

        } else if (popupType === "inCharge") {
            const value = newValue as TeamMember
            const requestBody: PatchIssueInChargeRequest = {issueNum, inCharge: value.email};

            const responseBody = await patchIssueInChargeRequest(requestBody, accessToken);

            patchIssueInChargeResponse(responseBody);

            // patch incharge request..
        }
        setPopUpClickState(false);
        setValue(newValue as number | string);
    }
    // useEffect : 마운트시 실행할 함수
    useEffect(() => {
        // 브라우저 전체에 대해서 마운트시 클릭이벤트함수 생성
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // 언 마운트시 제거
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, []);

    return (
        // ??는 null 또는 undefined 에 대해서 기본값을 설정하는 연산자임
        // 따라서 offset객체가 빈 객체로 설정될 경우 내부에 값이 없기 때문에 offset.right는 undfined로됨

        <>

            {popupType !== "inCharge" ?


                <div ref={popUpRef} id={"btn-popup-wrapper"} style={{
                    marginBottom: `${offset.top ?? 0}px`,
                    marginTop: `${offset.bottom ?? 0}px`,
                    marginLeft: `${offset.right ?? 0}px`,
                    marginRight: `${offset.left ?? 0}px`,
                    width: `${size.width ?? undefined}px`,
                    maxHeight: `${size.height ?? undefined}px`
                }}>
                    <div className={"btn-popup-option-container"}>
                        {menu.map(value =>
                            <div key={value as number}
                                 className={"btn-popup-option"}
                                 onClick={() => onOptionClickEventHandler(value as number)}
                                 style={optionStyle(value as number).background}>
                                {optionStyle(value as number).optionName}
                            </div>)}
                    </div>
                </div> :

                <div ref={popUpRef} className={"btn-popup-inCharge-wrapper"}
                     style={{
                         marginBottom: `${offset.top ?? 0}px`,
                         marginTop: `${offset.bottom ?? 0}px`,
                         marginLeft: `${offset.right ?? 0}px`,
                         marginRight: `${offset.left ?? 0}px`,
                         width: `${size.width ?? undefined}px`,
                         maxHeight: `${size.height ?? undefined}px`
                     }}>
                    <div className={"btn-popup-inCharge-title"}>{"담당자(팀원)"}</div>
                    <div className={"btn-popup-inCharge-container"}>

                        {menu.map(value => {
                                const member = value as TeamMember
                                return (
                                    <div className={"btn-popup-inCharge-option-box"}
                                         onClick={() => onOptionClickEventHandler(member as TeamMember)}>

                                        <InitialsImg name={member.nickname ? member.nickname : ""} width={26} height={26}/>
                                        <div className={"btn-popup-inCharge-option"}>{member.nickname}</div>
                                    </div>)
                            }
                        )}
                    </div>
                </div>
            }

        </>
    )
}