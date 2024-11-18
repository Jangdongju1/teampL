import "./style.css"
import InitialsImg from "../../../InitialsImg";
import CommonBtn from "../../../btn";
import {useState} from "react";
import Editor from "../../../editor";
import DOMPurify from "dompurify";

type CommentProps = {
    userInfo: {
        userEmail: string,
        userPicture: string
    },
    commentInfo: {
        commentNum: number,
        content: string
        writeDate: string,
    }

}
export default function CommentComp() {


    //state : 편집버튼 클릭 상태
    const [mBtnClickState, setMBtnClickState] = useState<boolean>(false);
    //state : 원 댓글 상태.
    const [commentView, setCommentView] = useState<string>("원댓글");
    //state : 수정용 에이터 입력상태.
    const [modifiedComment, setModifiedComment] = useState<string>(commentView);

    // dangerouslySetInnerHTML의 위협으로 부터 방지하기 위한 보안처리 된 댓글
    const protectedComment  = DOMPurify.sanitize(commentView);



    //eventHandler : 편집버튼 클릭 이벤트 헨들러.
    const onModificationBtnClickEventHandler = () => {
        setMBtnClickState(true);
    }
    // eventHandler : 댓글 삭제버튼 클릭 이벤트 헨들러
    const onDeleteBtnClickEventHandler = ()=>{
        // 댓글 삭제 api호출
    }
    //eventHandler : 저장버튼 클릭 이벤트 헨들러
    const onSaveBtnClickEventHandler = () => {
        modifiedComment === "<p><br></p>" ? setCommentView("") : setCommentView(modifiedComment);
        // 댓글 수정 api 호출
        setMBtnClickState(false);
    }
    //eventHandler : 취소버튼 클릭 이벤트 헨들러
    const onCancelBtnClickEventHandler = () => {
        setModifiedComment(commentView);
        setMBtnClickState(false);
    }


    return (
        <div id={"comment-comp-wrapper"}>
            <div className={"comment-comp-user-picture-box"}>
                <InitialsImg name={"jdj881204@naver.com"} width={32} height={32}/>
            </div>
            <div className={"comment-comp-content-box"}>
                <div className={"comment-comp-user-info"}>
                    <div
                        className={"comment-comp-user-email comment-comp-info-font-style"}>{"jdj881204@naver.com"}</div>
                    <div className={"comment-comp-reg-info comment-comp-info-font-style"}>{"3분전"}</div>
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
                        </div>
                    </>
                }
            </div>

        </div>

    )
}