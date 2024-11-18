import "./style.css"
import {MouseEvent} from "react";

type CommonBtnProps = {
    onClick?: () => void,
    style: {
        size: { width: number, height: number },
        backgroundColor?: string,
        hoverColor?: string,
        hoverStyle?: "background" | "innerHTML"
        btnName?: string,
        fontSize?: number,
        fontColor?: string
    }
}
export default function CommonBtn({onClick, style}: CommonBtnProps) {
    const {
        size,
        btnName,
        backgroundColor,
        fontSize,
        fontColor,
        hoverColor,
        hoverStyle
    } = style;

    // eventHandler : 마우스 엔터시 이벤트
    const onMouseEnterEventHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (!hoverStyle || !hoverColor) return;
        const element = e.target as HTMLDivElement;

        if (hoverStyle === "background") {
            element.style.backgroundColor = hoverColor;
        } else {
            element.style.color = hoverColor;
            element.style.textDecoration = "underline"

        }

    }
    //eventHandler : 마우스 리브시 이벤트
    const onMouseLeaveEventHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (!hoverStyle || !hoverColor) return;
        const element = e.target as HTMLDivElement;
        if (hoverStyle === "background") {
            if (!backgroundColor) return;
            element.style.backgroundColor = backgroundColor;
        }else {
            if (!fontColor) return;
            element.style.color = fontColor;
            element.style.textDecoration = "none"
        }


    }

    return (
        <>
            <div className={"default-btn"}
                 style={{
                     backgroundColor: backgroundColor,
                     width: `${size.width}px`,
                     height: `${size.height}px`,
                     fontSize: `${fontSize}px`,
                     color: fontColor,
                 }}
                 onClick={onClick}
                 onMouseEnter={onMouseEnterEventHandler}
                 onMouseLeave={onMouseLeaveEventHandler}>
                {btnName ? btnName : "기본버튼"}
            </div>
        </>
    )
}
