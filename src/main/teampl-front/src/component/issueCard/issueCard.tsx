import "./style.css";
import InitialsImg from "../InitialsImg";
import {IssueStatus, ModalType} from "../../common";
import React, {KeyboardEvent, useState} from "react";
import {Issue} from "../../interface/types";
import {useCookies} from "react-cookie";
import {PatchIssueTitleResponse, ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import FlexibleInput from "../inputCmponent/flexibleInput";
import {PatchIssueTitleRequest} from "../../interface/request";
import {patchIssueTitleRequest} from "../../api/issueApi";
import {issueStore, modalStore} from "../../store";
import {getKanbanName} from "../../constant/issueConstants";

type IssueCardProps = {
    data: Issue
    isTeamKanban: boolean,
    eachKanbanState : Record<string, Issue[]>,
    // setEachKanbanState: React.Dispatch<React.SetStateAction<Record<string, Issue[]>>>
    setEachKanbanState: (newValue : Record<string, Issue[]>) => void
}

export default function IssueCard(props: IssueCardProps) {

    // props
    const {data} = props
    const {isTeamKanban} = props;
    // 상태 변경의 반영을 위한 칸반보드 데이터
    const {eachKanbanState, setEachKanbanState} = props;


    // global state: 이슈 넘버 세팅.
    const {setIssueNum} = issueStore();
    // global state: 모달 상태
    const {setIsModalOpen,setModalType} = modalStore();
    // state:쿠키 상태
    const [cookies] = useCookies();
    // state: 이슈카드 제목 변경이벤트상태
    const [titleChange, setTitleChange] = useState<boolean>(false);
    // state : 칸반보드 이슈카드 제목 상태
    const [title, setTitle] = useState<string>(data.title);




    // eventHandler: 이슈카드 클릭 이벤트 헨들러
    const onIssueCardClickEventHandler = ()=>{
        setIssueNum(data.issueNum);  // 이슈넘버를 세팅
        setIsModalOpen(true);
        setModalType(ModalType.ISSUE_INFO);
    }

    //eventHandler : title 클릭 이벤트 헨들러
    const onTitleClickEventHandler = () => {
        setTitleChange(!titleChange)
    }
    //eventHandler : flexibleInput 키다운 핸들러
    const onTitleKeyDownEventHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            setTitleChange(!titleChange);
            TitleChangeRequest();
        }

    }


    // //*function: Title변경 api호출 결과처리
    const patchTitleResponse = (responseBody: PatchIssueTitleResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;
        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as PatchIssueTitleResponse;

        if (!data) return;
        const kanbanStat = data.issueStat;

        // 상태 변경
        const updatedState = {...eachKanbanState,
        [getKanbanName(kanbanStat)] : eachKanbanState[getKanbanName(kanbanStat)].map( issue =>
            issue.issueNum === data.issueNum? ({...issue, title : data.changedTitle}) : issue
        )}

        setEachKanbanState(updatedState);

    }

    //* function : Title 변경 api 호출함수
    const TitleChangeRequest = async () => {
        const token = cookies.accessToken_Main;
        if (!token) return;
        const requestBody: PatchIssueTitleRequest =
            {issueNum: data.issueNum, projectNum: data.projectNum, title};

        const responseBody = await patchIssueTitleRequest(requestBody, token);

        patchTitleResponse(responseBody);
    }


    // priority에 따른 css색과 문구
    const getPriority = (priority: number) => {
        const priorities: { [key: string]: { text: string, color: string } } = {  // 상태는 총 4가지임.
            "0": {text: "Normal", color: "#e8e8e8"},
            "1": {text: "Long Term", color: "#4A90E2"},
            "2": {text: "Urgent", color: "#F5A623"},
            "3": {text: "Very Urgent", color: "#D0021B"}
        };

        return priorities[priority.toString()];
    }

    // stat에 따른 아이콘
    const getStatIcon = (stat: number) => {
        const statIcons: { [key: string]: string } = {
            "0": "waiting-icon",
            "1": "in-progress-icon",
            "2": "in-progress-icon",
            "3": "complete-icon"
        }
        return statIcons[stat.toString()];
    }

    return (
        <div id={"issue-card-wrapper"}>
            <div className={"issue-card-container"}>
                <div className={"issue-card-title-box"}>
                    {!titleChange ?
                        <div className={"issue-card-title"} onClick={onTitleClickEventHandler}>{data.title}</div> :
                        <FlexibleInput onKeyDown={onTitleKeyDownEventHandler}
                                       value={title}
                                       setValue={setTitle}
                                       setChangeSate={setTitleChange}/>
                    }
                </div>

                <div className={"issue-card-content-box"} onClick={onIssueCardClickEventHandler}>

                    <div className={"issue-card-middle-box"}>
                        <div className={"issue-card-priority-btn"}>
                            {data.priority < 4 && (<>
                                <div className={"issue-card-priority-color"}
                                     style={{backgroundColor: `${getPriority(data.priority).color}`}}/>
                                <div className={"issue-card-priority-stat"}>{getPriority(data.priority).text}</div>
                            </>)}
                        </div>
                    </div>

                    <div className={"issue-card-bottom-box"}>
                        <div className={"issue-card-bottom-top-box"}>
                            {!isTeamKanban ? <></> :
                                <div className={"issue-card-incharge-box"}>
                                    {"inCharge"}
                                    {!data.inCharge ?
                                        <span className={"icon issue-card-incharge-icon person-check-icon"}></span> :
                                        <span className={"issue-card-incharge-icon"}>
                            <InitialsImg name={data.email} width={20} height={20}/>
                        </span>}
                                </div>
                            }
                        </div>

                        <div className={"issue-card-bottom-middle-box"}>
                            <div className={"issue-card-bottom-middle-stat"}>
                                {"status"}
                                <span
                                    className={`icon stat-icon ${data.stat < Object.keys(IssueStatus).length / 2 ? getStatIcon(data.stat) : ``}`}/>
                            </div>
                        </div>

                        <div className={"issue-card-bottom-bottom-bottom-box"}>
                            <div className={"issue-card-bottom-sequence"}>{data.issueSequence}</div>
                            <div className={"issue-card-bottom-etc-box"}>
                                <div className={"issue-card-bottom-icon-box"}>
                                    <span className={"icon issue-card-icon comment-icon"}></span> {data.commentCnt}
                                </div>

                                <div className={"issue-card-bottom-icon-box"}>
                                    <span className={"icon issue-card-icon connect-icon"}></span> {0}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}