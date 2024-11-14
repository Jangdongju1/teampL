import "./style.css"
import React from "react";
import InitialsImg from "../../../InitialsImg";
import {IssuePriority, IssueStatus} from "../../../../common";

type ModalCompBtnStyleProps = {
    labelName: string,
    labelIcon: string,
    btnName?: string,
    optionType?: {
        inCharge?: string,
        participants?: string[],
        priority?: number,
        status?: number
    }
    styleType?: "priority" | "category" | "participants" | "default"  // 1) priority,2)category,3)participants,4)default
}


export default function ModalCompBtnStyle(props: ModalCompBtnStyleProps) {

    const {labelName, btnName, labelIcon, styleType} = props;
    const {optionType} = props;

    // 우선순위(priority)별 텍스트 및 색
    const priorityBackgroundCss = (priority: number) => {
        const priorities: { [key: string]: { text: string, color: string } } = {  // 상태는 총 4가지임.
            [IssuePriority.NORMAL]: {text: "Normal", color: "#e8e8e8"},
            [IssuePriority.LONG_TERM]: {text: "Long Term", color: "#4A90E2"},
            [IssuePriority.URGENT]: {text: "Urgent", color: "#F5A623"},
            [IssuePriority.VERY_URGENT]: {text: "Very Urgent", color: "#D0021B"}
        };

        return priorities[priority.toString()];
    }

    // 칸반보드 상태는 4가지가 있다. 1)Not Start 2)On Working, 3) Stuck 4) Done
    // 이슈 상태에 따른 컴포넌트 버튼 배경색 및 버튼이름의 변화
    const statusBackgroundCss = (status: number) => {
        const stats: { [key: string]: { text: string, color: string } } = {  // 객체 정의
            [IssueStatus.NOT_START]: {text: "Not Start", color: "rgb(121, 126, 147)"},
            [IssueStatus.ON_WORKING]: {text: "On Working", color: "rgb(253, 188, 100)"},
            [IssueStatus.STUCK]: {text: "Stuck", color: "rgb(232, 105, 125)"},
            [IssueStatus.DONE]: {text: "Done", color: "rgb(51, 211, 145)"}
        }
        return stats[status.toString()];
    }


    // 여러 속성을 동시에 주지 못하도록 우선손위를 둔다.
    const handleConflictingOptions = () => {
        if (!optionType) return;

        const options = [optionType?.priority, optionType?.status, optionType?.inCharge, optionType?.participants];
        const nonEmptyOptions =
            options.filter(option => option !== undefined && option !== null);


        if (nonEmptyOptions.length > 1) {
            console.warn("Only one of 'priority', 'status', 'inCharge', or 'participants' should be provided.");
            // 예시로 우선순위대로 처리 (priority > status > inCharge > participants)
            if (optionType.priority) {
                return {priority: optionType.priority};
            } else if (optionType?.status) {
                return {status: optionType.status};
            } else if (optionType.inCharge) {
                return {inCharge: optionType.inCharge}
            } else if (optionType.participants) {
                return {participants: optionType.participants}
            }
        }
        // 옵션이 1개만 존재하는 경우
        return optionType;
    };

    // 우선순위에 따른 최종 옵션
    const finalOption = handleConflictingOptions();


    // 최종 적용 옵션에 따른 버튼 배경색 변화
    const getBtnStyle = (): { btnName: string, background: { backgroundColor: string | undefined } } => {
        const defaultVal = {btnName: "", background: {backgroundColor: undefined}};


        if (!finalOption) return defaultVal;

        if (finalOption.priority != undefined) {

            const key: number = finalOption.priority
            const btnName: string = priorityBackgroundCss(key).text;
            const background: { backgroundColor: string } = {backgroundColor: priorityBackgroundCss(key).color};
            return {btnName: btnName, background: background};

        } else if (finalOption.status !== undefined) {
            const key = finalOption.status
            const btnName: string = statusBackgroundCss(key).text;
            const background: { backgroundColor: string } = {backgroundColor: statusBackgroundCss(key).color};
            return {btnName: btnName, background: background};
        }

        // 그 외에는 기본 스타일
        return defaultVal;
    }

    const getBtnFontColor = (): string => {
        if (!finalOption) return "";
        if (!styleType) return "default"

        if (finalOption.priority === IssuePriority.NORMAL) return "default";
        if (finalOption.status === IssueStatus.NOT_START) return "default"

        return styleType;
    }


    return (

        <div className={"issue-modal-btn-style-comp-wrapper"}>
            <div className={"issue-modal-btn-style-comp-label-box"}>
                <span className={`icon issue-modal-btn-style-comp-label-icon ${labelIcon}`}/>
                {labelName}
            </div>

            <div className={"issue-modal-btn-style-comp-content-box"}
                 style={getBtnStyle().background}>

                <div className={`issue-modal-btn-style-${getBtnFontColor()

                    // !styleType ? "default" :
                    // optionType?.priority === IssuePriority.NORMAL ? "default" : styleType
                }`}>

                    {!btnName ? getBtnStyle().btnName : btnName}
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