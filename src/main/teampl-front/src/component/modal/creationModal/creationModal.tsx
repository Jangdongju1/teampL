import "./style.css"
import InputComponent from "../../inputCmponent";
import {ChangeEvent, useState} from "react";
import {modalStore} from "../../../hook";

type HeaderBtnModalProps = {
    title: string,  // 모달의 제목
    comment: string,  // 우측상단 모달 설명
    nameLabel: string, // 이름 input의 라벨
    nameToolTip: string,// 툴팁 멘트
    onClick : () => void // 생성 버튼을 눌렀을때 작업 함수
    isTeamCreationModal: boolean  // 팀생성 모달인지 여부
}
// 1) 팀 생성, 2)프로젝트 생성 3)팀프로젝트 생성 3곳에서 쓰일 모달창.
export default function CreationModal(props:HeaderBtnModalProps) {
    const {title, comment,nameLabel, nameToolTip,onClick, isTeamCreationModal} = props;
    // global State: 모달의 전역상태
    const {setIsModalOpen, setModalType} = modalStore();

    // state : name 인풋 상태
    const [nameState, setNameState] = useState<string>("");
    // state : description 인풋 상태
    const [descriptionState, setDescriptionState] = useState<string>("");


    //eventHandler :  name상태 변경 이벤트 처리 헨들러
    const onNameInputStateChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameState(value);
    }
    //eventHandler :  description 상태 변경 이벤트 처리 헨들러
    const onDescriptionStateChangeEventHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescriptionState(value);
    }
    //eventHandler : 모달창  닫기버튼 클릭 이벤트 헨들러
    const onCloseModalBtnClickEventHandler = () =>{
        setIsModalOpen(false);
        setModalType("");
    }
    return (
        <div id={"creation-modal-wrapper"}>
            <div className={"creation-modal-title-box"}>
                <div className={"creation-modal-title"}>{title}</div>
            </div>

            <div className={"creation-modal-body"}>
                <div className={"creation-modal-body-picture-box"}>
                    <div className={"creation-modal-body-picture creation-picture"}></div>
                </div>

                <div className={"creation-modal-body-content-box"}>
                    <div className={"creation-modal-body-content-comment-box"}>
                        <div className={"creation-modal-body-content-comment"}>{comment}</div>
                    </div>

                    <div className={"creation-modal-body-content-name-input-box"}>
                        <div className={"creation-modal-input-label"}>
                            {nameLabel}
                            <span className={"creation-modal-input-label-essential-mark"}>{"*"}</span>
                        </div>
                        <InputComponent
                            type={"text"}
                            value={nameState}
                            onChange={onNameInputStateChangeEventHandler}
                            error={false}/>
                        <div className={"creation-modal-input-tool-tip-box"}>
                            <div className={"creation-modal-input-tool-tip"}>
                                {nameToolTip}
                                <span className={"icon creation-modal-input-tool-tip-icon tool-tip-icon"}/></div>
                        </div>
                    </div>

                    <div className={"creation-modal-body-content-description-input-box"}>
                        <div className={"creation-modal-body-content-description-label"}>
                            {"Description"}
                        </div>
                        <textarea className={"creation-modal-body-content-description-input"}
                                  value={descriptionState}
                                  onChange={onDescriptionStateChangeEventHandler}></textarea>
                    </div>

                    <div className={"creation-modal-bottom-btn-box"}>
                        <div className={"creation-modal-bottom-btn-cancel"} onClick={onCloseModalBtnClickEventHandler}>{"취소"}</div>
                        <div className={"creation-modal-bottom-btn-creation"} onClick={onClick}>{"프로젝트 생성"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}