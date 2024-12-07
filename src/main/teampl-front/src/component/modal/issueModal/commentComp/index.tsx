import "./style.css"
import InitialsImg from "../../../InitialsImg";
import CommonBtn from "../../../btn";
import {useState} from "react";
import Editor from "../../../editor";
import DOMPurify from "dompurify";
import {IssueComment} from "../../../../interface/types";
import UserEmailStore from "../../../../store/userEmailStore";
import dayjs from "dayjs";
import {PatchIssueCommentRequest} from "../../../../interface/request";
import {patchIssueCommentRequest} from "../../../../api/issueApi";
import {useCookies} from "react-cookie";
import {PatchIssueCommentResponse, ResponseDto} from "../../../../interface/response";
import ResponseCode from "../../../../common/enum/responseCode";

type CommentProps = {
    data: IssueComment
}
export default function CommentComp({data}: CommentProps) {
    // props
    const {commentNum, issueNum, content, email, writeDate, picture} = data;
    // login user
    const {loginUserEmail} = UserEmailStore();
    // cookie 상태
    const [cookies, setCookies] = useCookies();
    //state : 편집버튼 클릭 상태
    const [mBtnClickState, setMBtnClickState] = useState<boolean>(false);
    //state : 원 댓글 상태.
    const [commentView, setCommentView] = useState<string>(content);
    //state : 수정용 에디터 입력상태.
    const [modifiedComment, setModifiedComment] = useState<string>(commentView);

    // dangerouslySetInnerHTML의 위협으로 부터 방지하기 위한 보안처리 된 댓글
    const protectedComment = DOMPurify.sanitize(commentView);

    const accessToken = cookies.accessToken_Main;


    //eventHandler : 편집버튼 클릭 이벤트 헨들러.
    const onModificationBtnClickEventHandler = () => {
        if (loginUserEmail !== email) return;
        setMBtnClickState(true);
    }
    // eventHandler : 댓글 삭제버튼 클릭 이벤트 헨들러
    const onDeleteBtnClickEventHandler = () => {
        // 댓글 삭제 api호출
    }
    //eventHandler : 저장버튼 클릭 이벤트 헨들러
    const onSaveBtnClickEventHandler = async () => {
        modifiedComment === "<p><br></p>" ? setCommentView("") : setCommentView(modifiedComment);

        if (!accessToken || email !== loginUserEmail) return;

        const requestBody: PatchIssueCommentRequest = {issueNum,commentNum, comment: modifiedComment};
        const responseBody = await patchIssueCommentRequest(requestBody, accessToken);

        patchCommentResponse(responseBody);


        setMBtnClickState(false);
    }
    //eventHandler : 취소버튼 클릭 이벤트 헨들러
    const onCancelBtnClickEventHandler = () => {
        setModifiedComment(commentView);
        setMBtnClickState(false);
    }


    // function : 작성일 경과시간 반환함수.
    const ElapsedTime = (date: string) => {
        const now = dayjs();
        const writeTime = dayjs(date)
        const gap = now.diff(writeTime, "s");


        if (gap < 60) return `${gap}초 전`;
        if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;

        return writeDate;
    }
    // function : 댓글 수정 요청 후 응답처리 함수
    const patchCommentResponse = (responseBody : PatchIssueCommentResponse | ResponseDto | null)=>{
        if (!responseBody) return;

        const {code,message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
    }


    return (
        <div id={"comment-comp-wrapper"}>
            <div className={"comment-comp-user-picture-box"}>
                {!picture || picture.length === 0 ? <InitialsImg name={email} width={32} height={32}/> :
                    <div>{"사진"}</div>}

            </div>
            <div className={"comment-comp-content-box"}>
                <div className={"comment-comp-user-info"}>
                    <div
                        className={"comment-comp-user-email comment-comp-info-font-style"}>{email}</div>
                    <div className={"comment-comp-reg-info comment-comp-info-font-style"}>{ElapsedTime(writeDate)}</div>
                </div>

                {mBtnClickState ?
                    <>
                        <Editor value={modifiedComment} setValue={setModifiedComment}/>
                        <div className={"comment-comp-btn-box"}>
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
                                onClick={onSaveBtnClickEventHandler}/>

                            <CommonBtn
                                style={
                                    {
                                        size: {width: 52, height: 32},
                                        btnName: "취소",
                                        fontSize: 16,
                                    }
                                }
                                onClick={onCancelBtnClickEventHandler}/>
                        </div>
                    </> :
                    <>
                        <div className={"comment-comp-content comment-comp-info-font-style"}
                             dangerouslySetInnerHTML={{__html: protectedComment}}></div>

                        {loginUserEmail === email ?
                            <div className={"comment-comp-btn-box"}>
                                <CommonBtn
                                    style={
                                        {
                                            size: {width: 28, height: 20},
                                            btnName: "편집",
                                            fontSize: 14,
                                            fontColor: "#44546F",
                                            hoverColor: "#6B778C",
                                            hoverStyle: "innerHTML"
                                        }
                                    }
                                    onClick={onModificationBtnClickEventHandler}/>

                                <CommonBtn
                                    style={
                                        {
                                            size: {width: 28, height: 20},
                                            btnName: "삭제",
                                            fontSize: 14,
                                            fontColor: "#44546F",
                                            hoverColor: "#6B778C",
                                            hoverStyle: "innerHTML"
                                        }
                                    }
                                    onClick={() => console.log("onClickFunction: delete comment")}/>
                            </div> : null}
                    </>
                }
            </div>

        </div>

    )
}