import "./style.css"
import {KeyboardEvent, useState} from "react";
import CommonInputComponent from "../../inputCmponent/common";
import ModalCompNormal from "./normalStyleComp";
import ModalCompBtnStyle from "./btnStyleComp";
import {IssueCategory, IssuePriority, IssueStatus} from "../../../common";

// 이슈에 대한 데이터를 받아올 예정.
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
    const [status, setStatus] = useState<number>(IssueStatus.DONE);
    // state : status 버튼 클릭상태
    const [statusBtnClickState, setStateBtnClickState] = useState<boolean>(false);

    // state : priority 상태
    const [priority, setPriority] = useState<number>(IssuePriority.URGENT);
    // state : priority 클릭상태
    const [priorityClickState, setPriorityClickState] = useState<boolean>(false);

    // state: expire Date 상태 //date picker 와 상호작용
    const [date, setDate] = useState<Date>(new Date("2024-12-04"));
    // state : expire Date 항목 클릭 상태
    const [expireDateClickSate, setExpireDateClickState] = useState<boolean>(false);


    //eventHandler: 제목 부분 클릭 이벤트 헨들러
    const onTitleClickEventHandler = () => {
        setIsChange(true);
    }
    //eventHandler: 인풋 전달용 keydown 이벤트 헨들러
    const onTitleKeyDownEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        if (key === "Enter") {
            setIsChange(false);
        }
    }

    // eventHandler

    return (
        <div id={"issue-modal-wrapper"}>
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
                            <ModalCompNormal labelName={"팀이름"}
                                             labelIcon={"issue-modal-team-icon"}
                                             viewData={""}/>

                            <ModalCompBtnStyle labelName={"담당자"} labelIcon={"incharge-icon"}
                                               hooks={{
                                                   value: inCharge,
                                                   setValue: setInCharge,
                                                   clickState: inChargeClickSate,
                                                   setClickState: setInChargeClickSate
                                               }}
                                               compType={"inCharge"}/>

                            <ModalCompBtnStyle labelName={"참여자"}
                                               labelIcon={"issue-modal-participants-icon"}
                                               hooks={{
                                                   value: participants,
                                                   setValue: setParticipants,
                                                   clickState: participantsClickState,
                                                   setClickState: setParticipantsClickState
                                               }}
                                               compType={"participants"}/>
                        </div>
                    }

                    <ModalCompBtnStyle labelName={"우선순위"} labelIcon={""}
                                       hooks={{
                                           value: priority,
                                           setValue: setPriority,
                                           clickState: priorityClickState,
                                           setClickState: setPriorityClickState
                                       }}
                                       compType={"priority"}/>

                    <ModalCompBtnStyle labelName={"상태"}
                                       labelIcon={""}
                                       hooks={{
                                           value: status,
                                           setValue: setStatus,
                                           clickState: statusBtnClickState,
                                           setClickState: setStateBtnClickState
                                       }}
                                       compType={"status"}
                    />

                    <ModalCompBtnStyle labelName={"카테고리"}
                                       labelIcon={""}
                                       hooks={{
                                           value: category,
                                           setValue: setCategory,
                                           clickState: categoryBtnClickState,
                                           setClickState: setCategoryBtnClickState
                                       }}
                                       compType={"category"}/>

                    <ModalCompBtnStyle labelName={"마감일자"} labelIcon={""}
                                       compType={"expireTime"}
                                       hooks={{
                                           value : date,
                                           setValue : setDate,
                                           clickState : expireDateClickSate,
                                           setClickState : setExpireDateClickState
                                       }}/>


                </div>


            </div>

            <div className={"issue-modal-right-container"}>

            </div>


        </div>
    )
}