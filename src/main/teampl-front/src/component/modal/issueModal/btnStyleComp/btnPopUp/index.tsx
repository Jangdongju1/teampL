import "./style.css"
import {IssueCategory, IssuePriority, IssueStatus} from "../../../../../common";
import {IssueCategories, IssuePriorities, IssueStats} from "../../../../../constant/issueConstants";
import React, {useEffect, useRef} from "react";
import {compileFunction} from "node:vm";

type BtnPopUpProps = {
    menu: IssueCategory[] | IssuePriority[] | IssueStatus[],
    cssOption?: {
        offset?: {
            top?: number,
            bottom?: number,
            right?: number,
            left?: number
        }
    },
    popupType: "category" | "priority" | "status",
    setPopUpClickState: React.Dispatch<React.SetStateAction<boolean>>
    setValue: React.Dispatch<React.SetStateAction<number>>
}
export default function BtnPopUp(props: BtnPopUpProps) {
    // 값과 관련된 prop
    const {menu, cssOption, popupType} = props;
    // 상태 변경과 관련되 props
    const {setPopUpClickState, setValue} = props

    // cssOption이 undefined일 경우에 빈객체를 반환한다.
    // 자바에서는 오로지 논리연산자로만 사용되는 || 이지만 Js에서는 좀더 다양하게 쓰이는듯 예를들면 값의 존재여부
    // 확인을 위해서 쓸 수 있다.
    const offset = cssOption?.offset || {};

    // ref : 외부 외부 클릭 감지용 ref
    const popUpRef = useRef<HTMLDivElement>(null);


    // function : popupType이 status인 경우 option의 css
    const optionStyle = (value: number): {
        optionName: string,
        background: { backgroundColor: string | undefined, color: string | undefined }
    } => {
        const defaultVal = {optionName: "", background: {backgroundColor: undefined, color: undefined}};

        // 스타일 반환함수
        const getStyle = (type: "status" | "category" | "priority", value: number) => {
            if (type === "status") {
                return IssueStats[value.toString()];
            } else if (type === "category") {
                return IssueCategories[value.toString()];
            } else if (type === "priority") {
                return IssuePriorities[value.toString()]
            }

            return undefined;
        }

        if (popupType === "status") {
            const style = getStyle(popupType, value) as { text: string, color: string };
            if (!style) return defaultVal;
            const color = value > IssueStatus.NOT_START ? "rgba(255,255,255,1)" : undefined;

            return {optionName: style.text, background: {backgroundColor: style.color, color: color}}
        } else if (popupType === "category") {
            const optionName = getStyle(popupType, value) as string;
            return {optionName: optionName, background: {backgroundColor: undefined, color: undefined}}
        } else if (popupType === "priority") {
            const style = getStyle(popupType, value) as { text: string, color: string };
            if (!style) return defaultVal;
            const color = value > IssuePriority.NORMAL? "rgba(255,255,255,1)" : undefined;

            return {optionName:style.text, background :{backgroundColor : style.color , color : color}};
        }


        return defaultVal;
    }

    // eventHandler: 외부클릭 감지 함수
    const handleClickOutside = (e: MouseEvent) => {
        if (popUpRef.current &&
            !popUpRef.current.contains(e.target as Node) &&  // 자기자신 이외의 요소를 클릭하거나
            !popUpRef.current.previousSibling?.contains(e.target as Node)) { // 자신의 이전 형제가 아닌곳을 클릭하면 닫힘
            setPopUpClickState(false);
        }
    }

    // eventHandler: option 클릭 이벤트 헨들러
    const onOptionClickEventHandler = (value: number) => {
        setPopUpClickState(false);
        setValue(value);
    }
    // useEffect : 마운트시 실행할 함수
    useEffect(() => {
        // 브라우저 전체에 대해서 마운트시 클릭이벤트함수 생성
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // 언 마운트시 제거
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, []);

    return (
        // ??는 null 또는 undefined 에 대해서 기본값을 설정하는 연산자임
        // 따라서 offset객체가 빈 객체로 설정될 경우 내부에 값이 없기 때문에 offset.right는 undfined로됨
        <div ref={popUpRef} id={"btn-popup-wrapper"} style={{
            marginBottom: `${offset.top ?? 0}px`,
            marginTop: `${offset.bottom ?? 0}px`,
            marginLeft: `${offset.right ?? 0}px`,
            marginRight: `${offset.left ?? 0}px`
        }}>
            <div className={"btn-popup-option-container"}>
                {menu.map(value =>
                    <div key={value}
                         className={"btn-popup-option"}
                         onClick={() => onOptionClickEventHandler(value)}
                         style={optionStyle(value).background}>
                        {optionStyle(value).optionName}
                    </div>)}
            </div>
        </div>
    )
}