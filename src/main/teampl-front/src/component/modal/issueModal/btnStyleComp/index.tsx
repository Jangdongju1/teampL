import "./style.css"
import React from "react";
import InitialsImg from "../../../InitialsImg";
import {IssuePriority} from "../../../../common";

type ModalCompBtnStyleProps = {
    labelName: string,
    labelIcon: string,
    btnName?: string,
    optionType?: {
        inCharge?: string,
        participants?: string[],
        priority?: number
    }
    styleType?: "priority" | "status" | "category" | "participants" | "default"  // 1) priority, 2)status ,3)category,4)participants, 5)default
}


export default function ModalCompBtnStyle(props: ModalCompBtnStyleProps) {

    const {labelName, btnName, labelIcon, styleType} = props;
    const {optionType} = props;

    // 우선 순위별 텍스트 및 색
    const priorityCss = (priority: number) => {
        const priorities: { [key: string]: { text: string, color: string } } = {  // 상태는 총 4가지임.
            "0": {text: "Normal", color: "#e8e8e8"},
            "1": {text: "Long Term", color: "#4A90E2"},
            "2": {text: "Urgent", color: "#F5A623"},
            "3": {text: "Very Urgent", color: "#D0021B"}
        };

        return priorities[priority.toString()];
    }

    //priority에 따른 배경색 설정 style객체 반환
    const priorityBackgroundStyle :{backgroundColor : string} | undefined =
        optionType?.priority ? {backgroundColor: priorityCss(optionType.priority).color} : undefined



    return (

        <div className={"issue-modal-btn-style-comp-wrapper"}>
            <div className={"issue-modal-btn-style-comp-label-box"}>
                <span className={`icon issue-modal-btn-style-comp-label-icon ${labelIcon}`}/>
                {labelName}
            </div>

            <div className={"issue-modal-btn-style-comp-content-box"}
                 style={optionType?.priority ? priorityBackgroundStyle : undefined}>

                <div className={`issue-modal-btn-style-${!styleType ? "default" :
                    optionType?.priority === IssuePriority.NORMAL ? "default" : styleType}`}>

                    {!btnName ? "" : btnName}
                    {!optionType?.inCharge ? null : <InitialsImg name={optionType.inCharge} width={26} height={26}/>}
                    {!optionType?.participants ? null :
                        optionType?.participants.map((item, index) =>
                            <InitialsImg key={index} name={item} width={26} height={26}/>
                        )
                    }
                </div>


            </div>
        </div>
    )
}