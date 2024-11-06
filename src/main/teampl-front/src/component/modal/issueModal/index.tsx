import "./style.css"
import {KeyboardEvent, useState} from "react";
import CommonInputComponent from "../../inputCmponent/common";
import ModalCompNormal from "./normalStyleComp";
import ModalCompBtnStyle from "./btnStyleComp";

type IssueModalProps = {
    isTeamModal: boolean
}
//modalType : isu
export default function IssueModal(props: IssueModalProps) {
    const {isTeamModal} = props
    // state:  제목 변경상태
    const [isChange, setIsChange] = useState<boolean>(false);
    // state:  제목 상태
    const [title, setTitle] = useState<string>("");

    //eventHandler: 제목 부분 클릭 이벤트 헨들러
    const onTitleClickEventHandler = () => {
        setIsChange(true);
    }
    ////eventHandler: 인풋 전달용 keydown 이벤트 헨들러
    const onTitleKeyDownEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        if (key === "Enter") {
            setIsChange(false);
        }
    }

    return (
        <div id={"issue-modal-size"}>
            <div className={"issue-modal-left-container"}>
                <div
                    className={"issue-modal-title"}>{"title-title-title-title-titletitletitletitletitletitletitle"}</div>
                <div className={"issue-modal-content-container"}>

                    <div className={"issue-modal-content-box-style"}>
                        <div className={"issue-modal-label-style"}>
                            <span className={"icon issue-modal-label-icon-style text-icon"}></span>
                            {"제목"}
                        </div>

                        <div className={"issue-modal-label-content-style"} style={{}}>
                            {!isChange ?
                                <div className={"issue-modal-content-show-style"}
                                     onClick={onTitleClickEventHandler}>{title}</div> :
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
                            <ModalCompNormal labelName={"팀이름"} labelIcon={"issue-modal-team-icon"} viewData={""}/>
                            <ModalCompBtnStyle labelName={"담당자"} labelIcon={"incharge-icon"} inCharge={"jdj881204@naver.com"}/>
                            <ModalCompBtnStyle labelName={"참여자"} labelIcon={"issue-modal-participants-icon"} participants={["jdj8812042@naver.com","hanmail.net"]}/>
                        </div>
                    }

                    <ModalCompBtnStyle labelName={"우선순위"} labelIcon={""} btnName={"Long Term"}/>
                    <ModalCompBtnStyle labelName={"상태"} labelIcon={""} btnName={"On Working"}/>
                    <ModalCompBtnStyle labelName={"카테고리"} labelIcon={""} btnName={"카테고리"}/>
                    <ModalCompBtnStyle labelName={"마감일자"} labelIcon={""} btnName={"2023-10-10"}/>

                </div>


            </div>

            <div className={"issue-modal-right-container"}>

            </div>


        </div>
    )
}