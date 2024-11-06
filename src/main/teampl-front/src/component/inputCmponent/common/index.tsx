import "./style.css"
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef} from "react";

type CommonInputProps = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
    setView?: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CommonInputComponent(props: CommonInputProps) {
    // props
    const {value, setValue, onKeyDown,setView} = props;
    // ref : input을  참조하기 위한 ref
    const inputRef = useRef<HTMLInputElement>(null);

    //eventHandler : 키보드 변경 이벤트 처리
    const onInputChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 50) return;
        setValue(value);
    }

    // 인풋 영역 밖의 클릭시 실행할 함수
    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)){
            if (setView) setView(false);
        }
    }

    // effect:마운트시 실행할 함수
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        // 언마운트시 실행할 함수
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);
    return (
        <div id={"common-input-wrapper"}>
            <input ref={inputRef} className={"common-input font-size-normal"} value={value}
                   onChange={onInputChangeEventHandler}
                   onKeyDown={onKeyDown ? onKeyDown : () => {
                   }}/>
        </div>
    )
}
