import "./style.css"
import React, {KeyboardEvent, useEffect, useMemo, useState} from "react";
import CommonInputComponent from "../../inputCmponent/common";
import ModalCompNormal from "./normalStyleComp";
import ModalCompBtnStyle from "./btnStyleComp";
import {IssueCategory, IssuePriority, IssueStatus} from "../../../common";
import Editor from "../../editor";
import CommonBtn from "../../btn";
import DOMPurify from "dompurify";
import CommentComp from "./commentComp";
import Pagination from "../../pagination";
import {issueStore, modalStore} from "../../../store";
import {useCookies} from "react-cookie";
import {
    getPersonalIssueByIssueNum,
    patchExpireDateRequest,
    patchIssueDetailRequest,
    patchIssueTitleRequest
} from "../../../api/issueApi";
import {
    GetPersonalIssueByNumResponse,
    PatchIssueExpireDateResponse,
    PatchIssueTitleResponse,
    ResponseDto
} from "../../../interface/response";
import ResponseCode from "../../../common/enum/responseCode";
import {PatchIssueDetailRequest, PatchIssueExpireDateRequest, PatchIssueTitleRequest} from "../../../interface/request";
import {getFormattedDateToString} from "../../../util";
import PatchIssueDetailResponse from "../../../interface/response/issue/patchIssueDetailResponse";

// 이슈에 대한 데이터를 받아올 예정.
type IssueModalProps = {
    isTeamModal: boolean
    setRefresh: React.Dispatch<React.SetStateAction<number>>
}
//modalType : isu
export default function IssueModal(props: IssueModalProps) {
    const {isTeamModal, setRefresh} = props

    //state: 프로젝트 번호 상태
    const [projectNum, setProjectNum] = useState<number | undefined>(undefined);
    // global state : 세팅된 전역상태
    const {issueNum, setIssueNum} = issueStore();
    // 쿠키 상태
    const [cookies, setCookies] = useCookies();

    // state:  제목 변경상태
    const [isChange, setIsChange] = useState<boolean>(false);
    // state:  제목 상태
    const [title, setTitle] = useState<string>("");
    // state : 제목 view 상태
    const [titleView, setTitleView] = useState<string>("")

    // state : 담당자 상태
    const [inCharge, setInCharge] = useState<string>("jdj881204@naver.com");
    // state : 담당자 클릭 상태
    const [inChargeClickSate, setInChargeClickSate] = useState<boolean>(false);

    // state : 참여자 상태
    const [participants, setParticipants] = useState<string[]>(["jdj88", "siedj22"]);
    // state : 참여자 클릭상태
    const [participantsClickState, setParticipantsClickState] = useState<boolean>(false);

    // state : category 상태
    const [category, setCategory] = useState<number>(IssueCategory.BUG_FIX);
    // state : category 버튼 클릭상태
    const [categoryBtnClickState, setCategoryBtnClickState] = useState<boolean>(false);

    // state : issueStatus 상태
    const [status, setStatus] = useState<number>(IssueStatus.NOT_START);
    // state : status 버튼 클릭상태
    const [statusBtnClickState, setStateBtnClickState] = useState<boolean>(false);

    // state : priority 상태
    const [priority, setPriority] = useState<number>(IssuePriority.NORMAL);
    // state : priority 클릭상태
    const [priorityClickState, setPriorityClickState] = useState<boolean>(false);

    // state: expire Date 상태 //date picker 와 상호작용
    const [expireDate, setExpireDate] = useState<Date | null>(null);
    // state : expire Date 항목 클릭 상태
    const [expireDateClickSate, setExpireDateClickState] = useState<boolean>(false);

    // state : issueDetail 상태
    const [issueDetail, setIssueDetail] = useState<string>("");
    // state : issueDetailView 상태
    const [issueDetailView, setIssueDetailView] = useState<string>("")
    // state : issueDetail 클릭 상태.
    const [issueDetailClickState, setIssueDetailClickState] = useState<boolean>(false);

    // state: comment 입력 상태
    const [comment, setComment] = useState<string>("");
    // global state: 모달 상태
    const {setIsModalOpen} = modalStore();

    // accessToken
    const accessToken = cookies.accessToken_Main;

    // dangerouslySetInnerHTML 는 보안문제 때문에 신중하게 사용해야 한다.
    // 사용자가 임의로 악성 스크립트를 삽입할 수 있기 때문이다.
    // DOMPurify와 같은 라이브러리로  입력값에 대한 보안검사를 할 수 있다.
    const protectedDetailViewValue = DOMPurify.sanitize(issueDetailView);


    // function : detail 변경 api 결과 처리 함수.
    const patchIssueDetailResponse = (responseBody:PatchIssueDetailResponse | ResponseDto | null)=>{
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS){
            alert(message);
            return;
        }

    }
    // function : title 변경 api 결과처리함수
    const patchTitleResponse = (responseBody: PatchIssueTitleResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        setRefresh(prevState => prevState * -1);

    }

    //eventHandler: 모달 닫기버튼 클릭 이벤트 헨들러
    const onIssueModalCloseBtnClickEventHandler = () => {
        setIsModalOpen(false);
    }

    //eventHandler: 제목 부분 클릭 이벤트 헨들러
    const onTitleClickEventHandler = () => {
        setIsChange(true);
    }


    //eventHandler: 인풋 전달용 keydown 이벤트 헨들러
    const onTitleKeyDownEventHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        if (key === "Enter") {
            if (!accessToken || !projectNum || !issueNum) return;
            const requestBody: PatchIssueTitleRequest = {title, issueNum, projectNum};

            const responseBody = await patchIssueTitleRequest(requestBody, accessToken);

            patchTitleResponse(responseBody);


            setTitleView(title);
            setIsChange(false);
        } else if (key === "Escape") {
            setIsChange(false);
        }
    }


    // eventHandler : 에디터 저장버튼 클릭 이벤트 헨들러
    const onDetailSaveBtnClickEventHandler = async () => {

        if (!accessToken) {
            alert("accessToken is Expired!!");
            return;
        }
        if (!projectNum || !issueNum) return;

        const requestBody : PatchIssueDetailRequest = {projectNum, issueNum, issueDetail};

        const responseBody = await patchIssueDetailRequest(requestBody, accessToken);

        patchIssueDetailResponse(responseBody);



        issueDetail === "<p><br></p>" ? setIssueDetailView("") : setIssueDetailView(issueDetail);
        setIssueDetailClickState(prevState => false);
    }

    // eventHandler : 에디터 취소버튼 클릭 이벤트 헨들러
    const onDetailCancelBtnClickEventHandler = () => {
        setIssueDetail(issueDetailView);
        setIssueDetailClickState(false);
    }
    // eventHandler : 에디터 뷰 영역 클릭 이벤트 헨들러
    const onDetailViewAreaClickEventHandler = () => {
        setIssueDetailClickState(true);
    }

    //* eventHandler : 날짜 선택시 실행할 이벤트 핸들러 DatePicker 전달용
    const onDateChangeEventHandler = async (date: Date | null) => {
        if (!accessToken) {
            alert("accessToken is Expired!!");
            return;
        }
        if (!projectNum || !issueNum) return;

        const requestBody: PatchIssueExpireDateRequest =
            {projectNum, issueNum, expireDate: date ? getFormattedDateToString(date) : ""};

        const responseBody = await patchExpireDateRequest(requestBody, accessToken);

        patchExpireDateResponse(responseBody);

        date ? setExpireDate(date) : setExpireDate(null);
        setExpireDateClickState(false);
    }


    // function : 이슈 마감기한 수정 호출에 대한 응답처리함수.
    const patchExpireDateResponse = (responseBody: PatchIssueExpireDateResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
    }
    // function : 이슈 데이터 api호출에 대한 응답처리
    const getPersonalIssueResponse = (responseBody: GetPersonalIssueByNumResponse | ResponseDto | null) => {
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetPersonalIssueByNumResponse;
        const {
            projectNum,
            title,
            stat,
            priority,
            inCharge,
            email,
            category,
            content,
            expireDate,
            writeDate,

        } = data.issue;

        setProjectNum(projectNum);
        setTitle(title);
        setTitleView(title);
        setStatus(stat);
        setPriority(priority);
        setInCharge(inCharge);
        setCategory(category);
        setIssueDetail(content);
        setIssueDetailView(content); // 뷰영역 또한 세팅
        setExpireDate(expireDate ? new Date(expireDate) : null);

    }


    useEffect(() => {
        // 특정 issue에 해당하는 데이터를 불러오는 api호출
        if (!accessToken || !issueNum) return;

        const fetchIssueData = async () => {
            const responseBody = await getPersonalIssueByIssueNum(issueNum, accessToken);

            getPersonalIssueResponse(responseBody);
        }

        fetchIssueData();

    }, [issueNum]);
    return (
        <div id={"issue-modal-wrapper"}>
            <div className={"issue-modal-left-container"}>
                <div
                    className={"issue-modal-title"}>{titleView}</div>
                <div className={"issue-modal-content-container"}>

                    <div className={"issue-modal-content-box-style"}>
                        <div className={"issue-modal-label-style"}>
                            <span className={"icon issue-modal-label-icon-style text-icon"}></span>
                            {"제목"}
                        </div>

                        <div className={"issue-modal-label-content-style"} style={{}}>
                            {!isChange ?
                                <div className={"issue-modal-content-show-style"}
                                     onClick={onTitleClickEventHandler}>{titleView}</div> :
                                <CommonInputComponent value={title}
                                                      setValue={setTitle}
                                                      onKeyDown={onTitleKeyDownEventHandler}
                                                      setView={setIsChange}/>
                            }
                        </div>
                    </div>

                    {!isTeamModal ?
                        null :
                        <div className={"issue-modal-team-info-container"}>
                            <ModalCompNormal labelName={"팀이름"}
                                             labelIcon={"issue-modal-team-icon"}
                                             viewData={""}/>

                            <ModalCompBtnStyle labelName={"담당자"} labelIcon={"incharge-icon"}
                                               hooks={{
                                                   value: inCharge,
                                                   setValue: setInCharge,
                                                   clickState: inChargeClickSate,
                                                   setClickState: setInChargeClickSate,
                                                   setRefresh: setRefresh
                                               }}
                                               compType={"inCharge"}/>

                            <ModalCompBtnStyle labelName={"참여자"}
                                               labelIcon={"issue-modal-participants-icon"}
                                               hooks={{
                                                   value: participants,
                                                   setValue: setParticipants,
                                                   clickState: participantsClickState,
                                                   setClickState: setParticipantsClickState,
                                                   setRefresh: setRefresh
                                               }}
                                               compType={"participants"}/>
                        </div>
                    }

                    <ModalCompBtnStyle labelName={"우선순위"} labelIcon={""}
                                       hooks={{
                                           value: priority,
                                           setValue: setPriority,
                                           clickState: priorityClickState,
                                           setClickState: setPriorityClickState,
                                           setRefresh: setRefresh
                                       }}
                                       compType={"priority"}/>

                    <ModalCompBtnStyle labelName={"상태"}
                                       labelIcon={""}
                                       hooks={{
                                           value: status,
                                           setValue: setStatus,
                                           clickState: statusBtnClickState,
                                           setClickState: setStateBtnClickState,
                                           setRefresh: setRefresh
                                       }}
                                       compType={"status"}/>

                    <ModalCompBtnStyle labelName={"카테고리"}
                                       labelIcon={""}
                                       hooks={{
                                           value: category,
                                           setValue: setCategory,
                                           clickState: categoryBtnClickState,
                                           setClickState: setCategoryBtnClickState,
                                           setRefresh: setRefresh
                                       }}
                                       compType={"category"}/>

                    <ModalCompBtnStyle labelName={"마감일자"} labelIcon={""}
                                       compType={"expireTime"}
                                       onChange={onDateChangeEventHandler}
                                       hooks={{
                                           value: expireDate,
                                           setValue: setExpireDate,
                                           clickState: expireDateClickSate,
                                           setClickState: setExpireDateClickState,
                                           setRefresh: setRefresh
                                       }}/>


                </div>


            </div>

            <div className={"issue-modal-right-container"}>
                <div className={"issue-modal-close-box"}>
                    <div className={"icon close-btn close-icon"} onClick={onIssueModalCloseBtnClickEventHandler}></div>
                </div>
                <div className={"issue-modal-right-edit-box"}>
                    <div className={"issue-modal-right-edit-title"}>{"Detail"}</div>

                    {issueDetailClickState ?
                        <div className={"issue-modal-right-edit"}>
                            <Editor
                                value={issueDetail}
                                setValue={setIssueDetail}
                                clickState={issueDetailClickState}
                                setClickState={setIssueDetailClickState}/>

                            <div className={"issue-modal-right-edit-btn-box"}>
                                <CommonBtn
                                    style={
                                        {
                                            size: {width: 52, height: 32},
                                            btnName: "저장",
                                            backgroundColor: "#0C66E4",
                                            hoverColor: "#0052CC",
                                            hoverStyle: "background",
                                            fontSize: 16,
                                            fontColor: "rgba(255,255,255,1)"
                                        }
                                    }
                                    onClick={onDetailSaveBtnClickEventHandler}/>

                                <CommonBtn
                                    style={
                                        {
                                            size: {width: 52, height: 32},
                                            btnName: "취소",
                                            fontSize: 16,
                                        }
                                    }
                                    onClick={onDetailCancelBtnClickEventHandler}/>
                            </div>

                        </div> : issueDetailView.length === 0 ?
                            <div className={"issue-editor-view-none"}
                                 onClick={onDetailViewAreaClickEventHandler}>{"이슈에 대한 설명"}</div> :

                            <div className={"issue-editor-view"}
                                 dangerouslySetInnerHTML={{__html: protectedDetailViewValue}}
                                 onClick={onDetailViewAreaClickEventHandler}></div>}

                </div>
                <div className={"issue-modal-right-comment-box"}>
                    <div className={"issue-modal-right-comment-title"}>{"Comment"}</div>

                    <div className={"issue-modal-right-comment"}>
                        <div className={"issue-modal-right-comment-editor"}>
                            <Editor value={comment} setValue={setComment}/>
                        </div>

                        <div className={"issue-modal-right-comment-btn-box"}>
                            <CommonBtn
                                style={
                                    {
                                        size: {width: 52, height: 32},
                                        btnName: "저장",
                                        backgroundColor: "#0C66E4",
                                        hoverColor: "#0052CC",
                                        hoverStyle: "background",
                                        fontSize: 16,
                                        fontColor: "rgba(255,255,255,1)"
                                    }
                                }
                                onClick={() => console.log("reg comment ")}/>

                        </div>
                    </div>
                    <div className={"issue-modal-right-comment-item-box"}>

                        <div className={"issue-modal-right-comment-item"}>
                            <CommentComp/>
                        </div>

                        <div className={"issue-modal-right-pagination"}>
                            <Pagination/>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
}