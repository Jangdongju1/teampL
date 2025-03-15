//component :  input컴포넌트
import "./style.css";
import {ChangeEvent, KeyboardEvent} from "react";

interface InputProps {
    label?: string,
    type: "text" | "password",
    placeholder?: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void, // 매개변수르 받는 함수타입
    error: boolean,
    message?: string,
    description?: string,  // 인풋에 대한 설명
    descriptionBtn?: string  // 설명에 버튼을 추가하고 싶을때  ex) 비밀번호를 잊으셨나요?버튼추가
    icon?: "key-light-on-icon" | "key-light-off-icon",
    onButtonClick?: () => void,  // 함수타입
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
    cssOption?: {
        width: number,
        height: number,
        fontSize?: number
    }
    emphasis?: boolean
}

export default function InputComponent(props: InputProps) {
    const {type, placeholder, value, error} = props;
    const {
        label,
        message,
        description,
        descriptionBtn,
        icon,
        cssOption,
        emphasis
    } = props
    const {onChange, onKeyDown, onButtonClick} = props;
    return (
        <div className={"input-box"}>
            <div className={"input-label"}>
                {label}
                {emphasis && (<span className={"label-emphasis"}>{"*"}</span>)}
            </div>

            <div className={error ? "input-box-container-error" : "input-box-container"}
                 style={{
                     width: cssOption ? cssOption.width : undefined,
                     height: cssOption ? cssOption.height : undefined
                 }}>
                <input className={`input`}
                       style={{fontSize: cssOption?.fontSize ? cssOption.fontSize : undefined}}
                       type={type}
                       placeholder={placeholder}
                       value={value} onChange={onChange}/>
                {onButtonClick != undefined && (
                    <div className={"icon-button"}>
                        {icon !== undefined && (<div className={`icon ${icon}`} onClick={onButtonClick}>{""}</div>)}
                    </div>
                )}
            </div>
            {description && (<div className={"input-box-message"}>
                {description}
                {descriptionBtn && (<span className={"input-box-message description-btn"}>{descriptionBtn}</span>)}
            </div>)}
            {message != undefined && (<div className={"input-box-message"}>{""}</div>)}

        </div>
    )
}