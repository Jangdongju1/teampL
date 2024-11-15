import DatePicker from "react-datepicker";
import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"


type DatePickerProps = {
    date: Date | undefined
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
    clickState : boolean
}
export default function CommonDatePicker(props: DatePickerProps) {
    const {date, setDate, clickState} = props;

    //eventHandler:날짜 선택시 변경이벤트 처리
    const onDateChangeEventHandler = (date: Date | null) => {
        if (!date) return;
        setDate(date);
    }
    return (
        <div id={"date-picker-wrapper"}>
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