import "./style.css"
import React, {KeyboardEvent, useEffect, useMemo, useState} from "react";
import CommonInputComponent from "../../inputCmponent/common";
import ModalCompNormal from "./normalStyleComp";
import ModalCompBtnStyle from "./btnStyleComp";
import {IssueCategory, IssuePriority, IssueStatus, KanbanBoardName} from "../../../common";
import Editor from "../../editor";
import CommonBtn from "../../btn";
import DOMPurify from "dompurify";
import CommentComp from "./commentComp";
import Pagination from "../../pagination/server";
import {issueStore, modalStore} from "../../../store";
import {useCookies} from "react-cookie";
import {
    getIssueCommentListRequest,
    getPersonalIssueInfo,
    getTeamIssueInfo,
    getTotalCommentCountRequest,
    patchExpireDateRequest,
    patchIssueDetailRequest,
    patchIssueTitleRequest,
    postIssueCommentRequest
} from "../../../api/issueApi";
import {
    GetCommentCountResponse,
    GetIssueCommentResponse,
    GetPersonalIssueInfoResponse,
    PatchIssueExpireDateResponse,
    PatchIssueTitleResponse,
    PostIssueCommentResponse,
    ResponseDto
} from "../../../interface/response";
import ResponseCode from "../../../common/enum/responseCode";
import {
    PatchIssueDetailRequest,
    PatchIssueExpireDateRequest,
    PatchIssueTitleRequest,
    PostIssueCommentRequest
} from "../../../interface/request";
import {getFormattedDate, getFormattedDateToString} from "../../../util";
import PatchIssueDetailResponse from "../../../interface/response/issue/patchIssueDetailResponse";
import {Issue, IssueComment, TeamMember} from "../../../interface/types";
import usePagination from "../../../hook/pagination/server/pagination";
import GetIssueCommentListRequest from "../../../interface/request/issue/GetIssueCommentListRequest";
import {useParams} from "react-router-dom";
import GetTeamIssueInfoResponse from "../../../interface/response/issue/getTeamIssueInfoResponse";


// 이슈에 대한 데이터를 받아올 예정.
type IssueModalProps = {
    isTeamModal: boolean,
    eachKanbanIssues: Record<string, Issue[]>,
    setEachKanbanIssues: (newValue: Record<string, Issue[]>) => void;
}

//modalType : isu
export default function IssueModal(props: IssueModalProps) {

    // path variable : 팀칸반일대 존재하는 regNum
    const {regNum} = useParams();

    const {isTeamModal, eachKanbanIssues, setEachKanbanIssues} = props
    //state: 프로젝트 번호 상태
    const [projectNum, setProjectNum] = useState<number | undefined>(undefined);
    // global state : 세팅된 전역상태
    const {issueNum, setIssueNum} = issueStore();
    // 쿠키 상태
    const [cookies, setCookies] = useCookies();

    // state:  제목 변경상태
    const [isTitleChange, setIsTitleChange] = useState<boolean>(false);
    // state:  제목 상태
    const [title, setTitle] = useState<string>("");
    // state : 제목 view 상태
    const [titleView, setTitleView] = useState<string>("")

    // state : 담당자 상태
    const [inCharge, setInCharge] = useState<string>("");
    // state : 담당자 클릭 상태
    const [inChargeClickSate, setInChargeClickSate] = useState<boolean>(false);

    // state: 팀모달이 아닌 경우에 inCharge대신 작성자를 담당자로 전달함.
    const [writer, setWriter] = useState<string>("");
    // state: 팀이름 상태
    const [teamName, setTeamName] = useState<string>("");
    // state: 팀 멤버 상태
    const [teamMembers , setTeamMembers] = useState<TeamMember[]>([]);


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

    // state : 작성일자
    const [writeDate, setWriteDate] = useState<string>("")


    // state : issueDetail 상태
    const [issueDetail, setIssueDetail] = useState<string>("");
    // state : issueDetailView 상태
    const [issueDetailView, setIssueDetailView] = useState<string>("")
    // state : issueDetail 클릭 상태.
    const [issueDetailClickState, setIssueDetailClickState] = useState<boolean>(false);

    // state: comment 입력 상태
    const [comment, setComment] = useState<string>("");
    // 댓글 데이터 상태
    const [issueComments, setIssueComments] = useState<IssueComment[]>([]);
    // global state: 모달 상태
    const {setIsModalOpen} = modalStore();

    // 페이지당 댓글 출력 갯수.
    const PER_PAGE: number = 5;
    // pagination custom hook
    const {
        viewPageList,
        currentSection,
        currentPage,
        setCurrentSection,
        setCurrentPage,
        setTotalCount
    } = usePagination(PER_PAGE);  // 1페이지당 5개


    // accessToken
    const accessToken = cookies.accessToken_Main;

    // dangerouslySetInnerHTML 는 보안문제 때문에 신중하게 사용해야 한다.
    // 사용자가 임의로 악성 스크립트를 삽입할 수 있기 때문이다.
    // DOMPurify와 같은 라이브러리로  입력값에 대한 보안검사를 할 수 있다.
    const protectedDetailViewValue = DOMPurify.sanitize(issueDetailView);



    // function : detail 변경 api 결과 처리 함수.
    const patchIssueDetailResponse = (responseBody: PatchIssueDetailResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
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

    //eventHandler: 모달 닫기버튼 클릭 이벤트 헨들러
    const onIssueModalCloseBtnClickEventHandler = () => {
        setIsModalOpen(false);
    }

    //eventHandler: 제목 부분 클릭 이벤트 헨들러
    const onTitleClickEventHandler = () => {
        setIsTitleChange(true);
    }


    //eventHandler: 인풋 전달용 keydown 이벤트 헨들러
    const onTitleKeyDownEventHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        if (key === "Enter") {
            if (!accessToken || !projectNum || !issueNum) return;
            const requestBody: PatchIssueTitleRequest = {title, issueNum, projectNum};

            // 타이틀 변경  == 카드의 상태를 변경해 준다
            const updateKanbanIssues = {
                ...eachKanbanIssues,
                [kanbanName(status)]: eachKanbanIssues[kanbanName(status)].map(issue =>
                    issue.issueNum === issueNum ? {...issue, title} : issue)
            }

            setEachKanbanIssues(updateKanbanIssues);

            const responseBody = await patchIssueTitleRequest(requestBody, accessToken);

            patchTitleResponse(responseBody);


            setTitleView(title);
            setIsTitleChange(false);
        } else if (key === "Escape") {
            setIsTitleChange(false);
        }
    }


    // eventHandler : 에디터 저장버튼 클릭 이벤트 헨들러
    const onDetailSaveBtnClickEventHandler = async () => {

        if (!accessToken) {
            alert("accessToken is Expired!!");
            return;
        }
        if (!projectNum || !issueNum) return;

        const requestBody: PatchIssueDetailRequest = {projectNum, issueNum, issueDetail};

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

    // eventHandler: 댓글 입력버튼 클릭 이벤트 헨들러
    const onCommentSaveBtnClickEventHandler = async () => {
        if (!accessToken) {
            alert("accessToken is expired!!");
            return;
        }
        if (!projectNum || !issueNum) return;

        const requestBody: PostIssueCommentRequest = {projectNum, issueNum, comment}

        const responseBody = await postIssueCommentRequest(requestBody, accessToken);

        postIssueResponse(responseBody);

    }

    // function: 총 댓글의 갯수를 가져오는 api 호출에 대한 응답처리 함수.
    const getTotalCommentCountResponse = (responseBody: GetCommentCountResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
        const {data} = responseBody as GetCommentCountResponse;
        setTotalCount(data.totalCount);

    }

    // function : 이슈에 대한 댓글 게시 요청에 대한 응답함수
    const postIssueResponse = (responseBody: PostIssueCommentResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        // 댓글 게시후 상태업데이트가 필요함
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

    const getTeamIssueInfoResponse = (responseBody : GetTeamIssueInfoResponse | ResponseDto | null)=>{
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetTeamIssueInfoResponse;

        const {issue,members} = data;

        setTeamMembers(members);

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
            teamName

        } = issue;


        setProjectNum(projectNum);
        setTitle(title);
        setTitleView(title);
        setStatus(stat);
        setPriority(priority);
        setInCharge(inCharge);
        setWriter(email);
        setCategory(category);
        setIssueDetail(content);
        setIssueDetailView(content); // 뷰영역 또한 세팅
        setExpireDate(expireDate ? new Date(expireDate) : null);
        setWriteDate(writeDate);
        setTeamName(teamName);

    }


    // function : 이슈 데이터 api호출에 대한 응답처리
    const getPersonalIssueInfoResponse = (responseBody: GetPersonalIssueInfoResponse | ResponseDto | null) => {
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetPersonalIssueInfoResponse;


        const {
            projectNum,
            title,
            stat,
            priority,
            inCharge,
            email,  // 작성자 추후에 로그인된 유저와 비교해서 자신이 등록한 이슈가 아닐시 수정이 불가하도록 만들 예정.
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
        setWriter(email);
        setCategory(category);
        setIssueDetail(content);
        setIssueDetailView(content); // 뷰영역 또한 세팅
        setExpireDate(expireDate ? new Date(expireDate) : null);
        setWriteDate(writeDate);

    }


    // function : 이슈에 대한 댓글 요청후 처리 함수
    const getIssueCommentResponse = (responseBody: GetIssueCommentResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetIssueCommentResponse;


        setIssueComments(data.commentList);
    }

    //  마운트시 : 이슈에 대한 데이터를 불러옴.
    useEffect(() => {
        // 특정 issue에 해당하는 데이터를 불러오는 api호출
        if (isTeamModal) {
            if (!accessToken || !issueNum || !regNum) return

            // 팀칸반 : 팀이슈
            const fetchTeamIssueData = async () => {
                const responseBody = await getTeamIssueInfo(String(issueNum), regNum, accessToken);
                getTeamIssueInfoResponse(responseBody);
            }

            fetchTeamIssueData()


        } else {
            if (!accessToken || !issueNum) return

            // 개인칸반 : 개인이슈
            const fetchPersonalIssueData = async () => {
                const responseBody = await getPersonalIssueInfo(issueNum, accessToken);

                getPersonalIssueInfoResponse(responseBody);
            }
            fetchPersonalIssueData();
        }

    }, [issueNum]);


    // 마운트시 : 일단 전체 댓글의 갯수를 불러옴
    useEffect(() => {
        if (!issueNum || !accessToken) return;

        const fetchCommentCount = async () => {
            const responseBody = await getTotalCommentCountRequest(issueNum, accessToken);

            getTotalCommentCountResponse(responseBody);
        }

        fetchCommentCount();
    }, [issueNum]);

    useEffect(() => {
        if (!issueNum || !accessToken) return;
        const requestParam: GetIssueCommentListRequest = {issueNum, page: currentPage, perPage: PER_PAGE}

        const fetchIssueComment = async () => {
            const responseBody = await getIssueCommentListRequest(requestParam, accessToken);
            getIssueCommentResponse(responseBody);
        }

        fetchIssueComment();


    }, [currentPage]);


    return (
        <div id={"issue-modal-wrapper"}>
            {/*클로즈 박스*/}

            <div className={"issue-modal-close-box"}>
                <div className={"icon close-btn close-icon"} onClick={onIssueModalCloseBtnClickEventHandler}></div>
            </div>
            <div className={"issue-modal-container"}>
                <div className={"issue-modal-left-container"}>

                    <div className={"issue-modal-title"}>{titleView}</div>
                    <div className={"issue-modal-content-container"}>

                        <div className={"issue-modal-content-box-style"}>
                            <div className={"issue-modal-label-style"}>
                                <span className={"icon issue-modal-label-icon-style text-icon"}></span>
                                {"제목"}
                            </div>

                            <div className={"issue-modal-label-content-style"} style={{}}>
                                {!isTitleChange ?
                                    <div className={"issue-modal-content-show-style"}
                                         onClick={onTitleClickEventHandler}>{titleView}</div> :
                                    <CommonInputComponent value={title}
                                                          setValue={setTitle}
                                                          onKeyDown={onTitleKeyDownEventHandler}
                                                          setView={setIsTitleChange}/>
                                }
                            </div>
                        </div>

                        <ModalCompBtnStyle labelName={"담당자"} labelIcon={"incharge-icon"}
                                           hooks={{
                                               value: isTeamModal ? inCharge : writer,
                                               setValue: setInCharge,
                                               clickState: inChargeClickSate,
                                               setClickState: setInChargeClickSate
                                           }}
                                           popUpData={teamMembers}
                                           compType={"inCharge"}/>
                        {/**/}

                        {!isTeamModal ?
                            null :
                            <div className={"issue-modal-team-info-container"}>
                                <ModalCompNormal labelName={"팀이름"}
                                                 labelIcon={"issue-modal-team-icon"}
                                                 viewData={teamName}
                                />

                            </div>
                        }

                        <ModalCompBtnStyle labelName={"우선순위"}
                                           labelIcon={"priority-icon"}
                                           hooks={{
                                               value: priority,
                                               setValue: setPriority,
                                               clickState: priorityClickState,
                                               setClickState: setPriorityClickState,
                                               eachKanbanIssues: eachKanbanIssues,
                                               setEachKanbanIssues: setEachKanbanIssues

                                           }}
                                           compType={"priority"}/>

                        <ModalCompBtnStyle labelName={"상태"}
                                           labelIcon={""}
                                           hooks={{
                                               value: status,
                                               setValue: setStatus,
                                               clickState: statusBtnClickState,
                                               setClickState: setStateBtnClickState,
                                               eachKanbanIssues: eachKanbanIssues,
                                               setEachKanbanIssues: setEachKanbanIssues

                                           }}
                                           compType={"status"}/>

                        <ModalCompBtnStyle labelName={"카테고리"}
                                           labelIcon={"category-icon"}
                                           hooks={{
                                               value: category,
                                               setValue: setCategory,
                                               clickState: categoryBtnClickState,
                                               setClickState: setCategoryBtnClickState,

                                           }}
                                           compType={"category"}/>

                        <ModalCompBtnStyle labelName={"마감일자"}
                                           labelIcon={"expire-date-icon"}
                                           compType={"expireTime"}
                                           onChange={onDateChangeEventHandler}
                                           hooks={{
                                               value: expireDate,
                                               setValue: setExpireDate,
                                               clickState: expireDateClickSate,
                                               setClickState: setExpireDateClickState,

                                           }}/>

                        <ModalCompNormal labelName={"작성일자"}
                                         labelIcon={"write-date-icon"}
                                         viewData={getFormattedDate(writeDate)}/>


                    </div>
                </div>

                <div className={"issue-modal-right-container"}>

                    {/*오른쪽 상단 디테일 입력 박스 */}

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


                    {/*오른쪽 하단 댓글 입력 박스*/}
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
                                    onClick={onCommentSaveBtnClickEventHandler}/>

                            </div>
                        </div>
                        <div className={"issue-modal-right-comment-item-box"}>

                            <div className={"issue-modal-right-comment-item"}>

                                {issueComments.map((item, index) =>
                                    <CommentComp key={item.commentNum} data={item}/>)}
                            </div>

                            <div className={"issue-modal-right-pagination"}>
                                <Pagination
                                    currentPage={currentPage}
                                    currentSection={currentSection}
                                    viewPageList={viewPageList}
                                    setCurrentSection={setCurrentSection}
                                    setCurrentPage={setCurrentPage}/>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            {/*<div className={"issue-modal-close-box"}>*/}
            {/*    <div className={"icon close-btn close-icon"} onClick={onIssueModalCloseBtnClickEventHandler}></div>*/}
            {/*</div>*/}


        </div>
    )
}