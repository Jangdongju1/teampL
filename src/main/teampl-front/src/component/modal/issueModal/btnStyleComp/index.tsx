import "./style.css"
import React from "react";
import InitialsImg from "../../../InitialsImg";

type ModalCompBtnStyleProps = {
    labelName: string,
    labelIcon: string,
    btnName?: string,
    inCharge?: string,
    participants?: string[]
}


export default function ModalCompBtnStyle(props: ModalCompBtnStyleProps) {

    const {labelName, btnName, labelIcon} = props;
    const {inCharge, participants} = props

    return (
        <div className={"issue-modal-btn-style-comp-wrapper"}>
            <div className={"issue-modal-btn-style-comp-label-box"}>
                <span className={`icon issue-modal-btn-style-comp-label-icon ${labelIcon}`}/>
                {labelName}
            </div>

            <div className={"issue-modal-btn-style-comp-content-box"}>
                {!participants ?
                    <div className={"issue-modal-btn-style-comp-content"}>
                        {!btnName ? "" : btnName}
                        {!inCharge ? <></> : <InitialsImg name={inCharge} width={26} height={26}/>}
                    </div> :

                    <div className={"issue-modal-participant-style"}>
                        {participants.map((item,index)=>
                            <InitialsImg name={item} width={26} height={26}/>
                        )}
                    </div>
                }


            </div>
        </div>
    )
}