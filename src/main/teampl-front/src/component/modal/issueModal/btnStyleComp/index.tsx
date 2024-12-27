import "./style.css"
import React, {useEffect, useState} from "react";
import {IssueCategory, IssuePriority, IssueStatus} from "../../../../common";
import {IssueCategories, IssuePriorities, IssueStats} from "../../../../constant/issueConstants";
import CommonDatePicker from "../../../datePicker";
import {getFormattedDateToString} from "../../../../util";
import BtnPopUp from "./btnPopUp";
import InitialsImg from "../../../InitialsImg";
import {Issue} from "../../../../interface/types";

type ModalCompBtnStyleProps<T> = {
    labelName: string,
    labelIcon: string,
    btnName?: string,
    hooks: {
        clickState: boolean,
        setClickState: React.Dispatch<React.SetStateAction<boolean>>
        value: T,
        setValue: React.Dispatch<React.SetStateAction<T>>,
        eachKanbanIssues? : Record<string, Issue[]>,
        //setEachKanbanIssues? : React.Dispatch<React.SetStateAction<Record<string, Issue[]>>>
        setEachKanbanIssues? : (newValue : Record<string, Issue[]>) => void;

    },
    onChange?: (date: Date | null) => void,
    compType: "status" | "priority" | "category" | "participants" | "expireTime" | "inCharge" | "default"
}


export default function ModalCompBtnStyle<T>(props: ModalCompBtnStyleProps<T>) {

    const {labelName, btnName, labelIcon} = props;
    // 옵션타입
    const {compType, hooks, onChange} = props;

    const {
        value,
        setValue,
        setClickState,
        clickState,
        setEachKanbanIssues,
        eachKanbanIssues
    } = hooks;


    //* optionValue: popUp용 카테고리 값에 대한 배열
    const categoryList = (): IssueCategory[] => {
        return Object.values(IssueCategory)
            .filter(value => typeof value === "number")
            .map(value => value as IssueCategory);
    }
    //* statusValue: popUp용 Status 값에 대한 배열
    const statusList = (): IssueStatus[] => {
        return Object.values(IssueStatus)
            .filter(value => typeof value === "number")
            .map(value => value as IssueStatus);
    }
    //* priorityValue: popUp용 priority 값에 대한 배열
    const priorityList = (): IssuePriority[] => {
        return Object.values(IssuePriority)
            .filter(value => typeof value === "number")
            .map(value => value as IssuePriority)
    }

    // function:  우선순위(priority)별 텍스트 및 배경색 반환 함수
    const priorityBackgroundCss = (priority: number) => {
        return IssuePriorities[priority.toString()];
    }

    // 칸반보드 상태는 4가지가 있다. 1)Not Start 2)On Working, 3) Stuck 4) Done
    // function: 이슈 상태에 따른 텍스트 및  배경색 반환함수
    const statusBackgroundCss = (status: number) => {
        return IssueStats[status.toString()];
    }
    // function: 카테고리에 따른 텍스트 반환함수
    const categoryNames = (category: number): string => {
        return IssueCategories[category.toString()];
    }


    // function:최종 적용 옵션에 따른 버튼네임 & 배경색 반환
    const getBtnStyle = (): { btnName: string | undefined, background: { backgroundColor: string } | undefined } => {
        const defaultVal = {btnName: "", background: undefined};

        if (compType === "default") return defaultVal;

        if (compType === "priority" && typeof value === "number") {

            const key: number = value;
            const btnName: string = priorityBackgroundCss(key).text;
            const background: { backgroundColor: string } = {backgroundColor: priorityBackgroundCss(key).color};
            return {btnName: btnName, background: background};

        } else if (compType === "status" && typeof value === "number") {
            const key = value;
            const btnName: string = statusBackgroundCss(key).text;
            const background: { backgroundColor: string } = {backgroundColor: statusBackgroundCss(key).color};
            return {btnName: btnName, background: background};
        } else if (compType === "category" && typeof value === "number") {
            const btnName = categoryNames(value);
            return {btnName: btnName, background: undefined};
        } else if (compType === "expireTime" && value instanceof Date) {
            const btnName = value ? getFormattedDateToString(value) : undefined;
            return {btnName: btnName, background: undefined}
        }
        // 그 외에는 기본 스타일
        return defaultVal;
    }

    const getBtnFontColor = (): string => {
        if (compType === "priority" && value === 0) return "default";
        if (compType === "status" && value ===
            0) return "default"


        return compType;
    }

    // eventHandler: 마우스 클릭 이벤트 처리
    const onClickEventHandler = () => {
        setClickState(!clickState)
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


                {compType === "expireTime" ?
                    <CommonDatePicker
                        date={value instanceof Date ? value : null}
                        clickState={clickState}
                        onChange={onChange ? onChange : () => {
                        }}/> :

                    null}

                <div
                    className={`issue-modal-btn-style-${getBtnFontColor() == "priority" ? "status" : getBtnFontColor()}`}>

                    {!btnName ? getBtnStyle().btnName : btnName}
                    {compType === "inCharge" && typeof value === "string" ?
                        <InitialsImg name={value} width={26} height={26}/> : null}

                    {compType === "participants" &&
                        Array.isArray(value) &&
                        value.every(item => typeof item === "string") &&
                        (value.map(value => <InitialsImg key={value} name={value} width={26} height={26}/>))
                    }
                </div>

            </div>
            {(compType === "category" && clickState) &&
                (<BtnPopUp menu={categoryList()}
                           popupType={compType}
                           cssOption={{
                               offset: {right: 220, bottom: 325}
                           }}
                           hooks={{
                               value : value as number,
                               setValue : setValue as React.Dispatch<React.SetStateAction<number>>,
                               setPopUpClickState : setClickState,
                           }}
                />)}
            {compType === "status" && clickState && (
                <BtnPopUp menu={statusList()}
                          popupType={compType}
                          cssOption={{
                              offset: {right: 220, bottom: 240}
                          }}
                          hooks={{
                              value : value as number,
                              setValue : setValue as React.Dispatch<React.SetStateAction<number>>,
                              setPopUpClickState : setClickState,
                              eachKanbanIssues : eachKanbanIssues,
                              setEachKanbanIssues : setEachKanbanIssues
                          }}
                />
            )}

            {compType === "priority" && clickState && (
                <BtnPopUp menu={priorityList()}
                          popupType={compType}
                          cssOption={{
                              offset: {right: 220, bottom: 240}
                          }}
                          hooks={{
                              value : value as number,
                              setValue : setValue as React.Dispatch<React.SetStateAction<number>>,
                              setPopUpClickState : setClickState,
                              eachKanbanIssues : eachKanbanIssues,
                              setEachKanbanIssues : setEachKanbanIssues
                          }}
                />
            )}
        </div>
    )
}