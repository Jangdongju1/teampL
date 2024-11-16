import DatePicker from "react-datepicker";
import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"


type DatePickerProps = {
    date: Date | undefined
    setDate: React.Dispatch<React.SetStateAction<Date>>,
    clickState : boolean
    setClickSate: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CommonDatePicker(props: DatePickerProps) {
    const {date, setDate, clickState,setClickSate} = props;

    //eventHandler:날짜 선택시 변경이벤트 처리
    const onDateChangeEventHandler = (date: Date | null) => {
        if (!date) return;
        setDate(date);
        setClickSate(false);

        /// 변경 api 요청 보내기

    }
    const preventEventBubbling = (e: React.MouseEvent) => {
        e.stopPropagation();  // 부모 컴포넌트로 이벤트 전파를 막음
    }



    return (
        <div id={"date-picker-wrapper"} onClick={preventEventBubbling}>
            <DatePicker className={"date-picker-container"}
                        selected={date}
                        onChange={onDateChangeEventHandler}
                        open={clickState}
                        popperClassName={"popper-offset"}
                        dateFormat={"yyyy-MM-dd"}
                        minDate={new Date()}
            />
        </div>
    )
}