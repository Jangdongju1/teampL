import "./style.css"
import {MouseEvent} from "react";

type CommonBtnProps = {
    onClick?: () => void,
    style: {
        size: { width: number, height: number },
        backgroundColor?: string,
        hoverColor?: string,
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
        hoverColor
    } = style;

    // eventHandler : 마우스 엔터시 이벤트
    const onMouseEnterEventHandler = (e: MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        if (!hoverColor) return;

        element.style.backgroundColor = hoverColor;
    }
    //eventHandler : 마우스 리브시 이벤트
    const onMouseLeaveEventHandler = (e: MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        if (!backgroundColor) return;

        element.style.backgroundColor = backgroundColor;
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
