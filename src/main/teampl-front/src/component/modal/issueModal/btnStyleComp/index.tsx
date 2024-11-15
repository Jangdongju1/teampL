import "./style.css"
import React, {useState} from "react";
import InitialsImg from "../../../InitialsImg";
import {IssuePriority, IssueStatus} from "../../../../common";
import {IssueCategories, IssuePriorities, IssueStats} from "../../../../constant/issueConstants";
import CommonDatePicker from "../../../datepicker";
import {getFormattedDateToString} from "../../../../util";

type ModalCompBtnStyleProps = {
    labelName: string,
    labelIcon: string,
    btnName?: string,
    optionType?: {
        inCharge?: string,
        participants?: string[],
        priority?: number,
        status?: number,
        category?: number
        expireDate?: string
    }
    styleType?: "status" | "category" | "participants" | "default"  // 1) priority,2)category,3)participants,4)default
}


export default function ModalCompBtnStyle(props: ModalCompBtnStyleProps) {

    const {labelName, btnName, labelIcon, styleType} = props;
    // 옵션타입
    const {optionType} = props;


    // function : expire date에 대한 유효성 체크
    const expireCondition = (): undefined | Date => {
        if (!optionType) return undefined;
        const date = optionType.expireDate;
        if (date === undefined || date.length == 0) return undefined;

        return new Date(date);
    }

    // state: expire Date 상태 //date picker 와 상호작용
    const [date, setDate] = useState<Date | undefined>(expireCondition());
    // state : expire Date 항목 클릭 상태
    const [expireDateClickSate, setExpireDateClickState] = useState<boolean>(false);


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
            } else if (optionType.status) {
                return {status: optionType.status};
            } else if (optionType.inCharge) {
                return {inCharge: optionType.inCharge}
            } else if (optionType.participants) {
                return {participants: optionType.participants}
            } else if (optionType.category) {
                return {category: optionType.category}
            } else if (optionType.expireDate) {
                return {expireDate: date?.toDateString()};  // 상태 값에서 가져옴
            }
        }
        // 옵션이 1개만 존재하는 경우
        return optionType;
    };

    // 우선순위에 따른 최종 옵션
    const finalOption = handleConflictingOptions();


    // function:  우선순위(priority)별 텍스트 및 배경색 반환 함수
    const priorityBackgroundCss = (priority: number) => {
        return IssuePriorities[priority.toString()];
    }

    // 칸반보드 상태는 4가지가 있다. 1)Not Start 2)On Working, 3) Stuck 4) Done
    // function: 이슈 상태에 따른 텍스트 및  배경색 반환함수
    const statusBackgroundCss = (status: number) => {
        return IssueStats[status.toString()];
    }
    // function: 카테고리에 따른 텍스트 반화함수
    const categoryNames = (category: number): string => {
        return IssueCategories[category.toString()];
    }


    // function:최종 적용 옵션에 따른 버튼네임 & 배경색 반환
    const getBtnStyle = (): { btnName: string | undefined, background: { backgroundColor: string } | undefined } => {
        const defaultVal = {btnName: "", background: undefined};

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
        } else if (finalOption.category !== undefined) {

            const key = finalOption.category;
            const btnName = categoryNames(key);
            return {btnName: btnName, background: undefined};
        } else if (finalOption.expireDate !== undefined) {
            const btnName = date ? getFormattedDateToString(date) : undefined;
            return {btnName: btnName, background: undefined}
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

    // eventHandler: 마우스 클릭 이벤트 처리
    const onClickEventHandler = () => {
        if (finalOption?.expireDate) {  // optionType expire일때 버튼 클릭시
            setExpireDateClickState(!expireDateClickSate);
        }
    }

    return (

        <div className={"issue-modal-btn-style-comp-wrapper"}>
            <div className={"issue-modal-btn-style-comp-label-box"}>
                <span className={`icon issue-modal-btn-style-comp-label-icon ${labelIcon}`}/>
                {labelName}
            </div>

            <div className={"issue-modal-btn-style-comp-content-box"}
                 style={getBtnStyle().background}
                 onClick={onClickEventHandler}>
                {optionType?.expireDate ? <CommonDatePicker
                        date={date}
                        setDate={setDate}
                        clickState={expireDateClickSate}/> :
                    null}

                <div className={`issue-modal-btn-style-${getBtnFontColor()}`}>

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