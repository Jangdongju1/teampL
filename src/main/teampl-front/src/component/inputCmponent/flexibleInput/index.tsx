import "./style.css";
import React, {KeyboardEvent, ChangeEvent, useRef, useState, useEffect} from "react";

type FlexibleInputProps = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    setChangeSate?: React.Dispatch<React.SetStateAction<boolean>>
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void,
}

export default function FlexibleInput(props: FlexibleInputProps) {
    // props
    const {value, setValue, onKeyDown, setChangeSate} = props

    // ref : 사이즈 조절용 ref
    const ref = useRef<HTMLTextAreaElement>(null);

    // eventHandler : value 입력 변경 이벤트처리
    const onValueChangeEventHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (value.length > 50) {
            return; // 글자수가 50을 넘으면 아무 동작도 하지 않음
        }
        setValue(value);

        const textArea = ref.current;
        if (!textArea) return;

        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
    }

    // 외부 클릭을 감지하여 이벤트 처리
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            if (setChangeSate) setChangeSate(false);
        }
    };

    //  textArea가 아닌 외부 클릭시 실행할 함수 지정.
    useEffect(() => {
        // 클릭 이벤트 리스너 추가
        document.addEventListener("mousedown", handleClickOutside);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div id={"flexible-input-wrapper"}>
            <div className={"flexible-input-container"}>
                <textarea ref={ref} className={"flexible-input"} rows={1} cols={15} value={value}
                          onChange={onValueChangeEventHandler}
                          onKeyDown={onKeyDown ? onKeyDown : () => {
                          }}/>
            </div>
        </div>
    )
}