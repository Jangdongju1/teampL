import "./style.css"
import CommonBtn from "../../btn";
import React from "react";

interface ConfirmModalProps {
    cssOption: {
        size?: { width: number, height?: number }
        icon?: string,
        iconSize?: { width: number, height: number }
    }
    comment?: string,
    detail?: string,
    confirm: () => void;
    cancel: () => void;
}

export default function ConfirmModal(props: ConfirmModalProps) {
    const {cssOption} = props;
    const {confirm, cancel} = props


    const defaultValue = {
        size: {width: 350},
        icon: "warning-icon",
        comment: "확인창입니다.",
        detail: "정말로 진행하시겠습니까?"
    }
    return (
        <div id={"confirm-modal-wrapper"}
             style={{
                 width: `${cssOption.size ? cssOption.size.width : defaultValue.size}px`,
                 height: cssOption.size?.height ? cssOption.size.height : undefined
             }}>

            <div className={"confirm-modal-icon-box"}>
                <div
                    className={`icon confirm-modal-icon circle ${cssOption.icon ? cssOption.icon : defaultValue.icon}`}></div>
            </div>

            <div className={"confirm-modal-comment-box"}>{props.comment ? props.comment : defaultValue.comment}</div>
            <div className={"confirm-modal-sub-comment-box"}>{props.detail ? props.detail : defaultValue.detail}</div>

            <div className={"confirm-modal-btn-box"}>
                <CommonBtn
                    style={
                        {
                            size: {width: 50, height: 26},
                            btnName: "확인",
                            hoverStyle: "background",
                            fontSize: 16,
                            fontColor: "rgba(0,0,0,1)",
                            border: "1px solid rgba(0,0,0,0.3)"
                        }
                    }
                    onClick={() => console.log("확인")}/>

                <CommonBtn
                    style={
                        {
                            size: {width: 50, height: 26},
                            btnName: "취소",
                            hoverStyle: "background",
                            fontSize: 16,
                            fontColor: "rgba(0,0,0,1)",
                            border: "1px solid rgba(0,0,0,0.3)"
                        }
                    }
                    onClick={cancel}/>
            </div>

        </div>
    )
}