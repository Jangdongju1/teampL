//component :  input컴포넌트
import "./style.css";
import {ChangeEvent, KeyboardEvent} from "react";

interface InputProps {
    label?: string,
    type: "text" | "password",
    placeholder?: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,  // 매개변수르 받는 함수타입
    error: boolean,
    icon?: "key-light-on-icon" | "key-light-off-icon",
    onButtonClick?: () => void,  // 함수타입
    message?: string,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export default function InputComponent(props: InputProps) {
    const {type, placeholder, value, error} = props;
    const {label, message, icon} = props
    const {onChange, onKeyDown, onButtonClick} = props;
    return (
        <div className={"input-box"}>
            <div className={"input-label"}>{label}</div>

            <div className={error? "input-box-container-error" : "input-box-container"}>
                <input className={"input"} type={type} placeholder={placeholder} value={value} onChange={onChange}/>
                {onButtonClick != undefined && (
                    <div className={"icon-button"}>
                        {icon !== undefined && (<div className={`icon ${icon}`} onClick={onButtonClick}>{""}</div>)}
                    </div>
                )}
            </div>
            {message != undefined && (<div className={"input-box-message"}>{""}</div>)}

        </div>
    )
}