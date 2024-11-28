import DatePicker from "react-datepicker";
import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"


type DatePickerProps = {
    date: Date | null,
    clickState : boolean,
    onChange : (date: Date | null) => void
}
export default function CommonDatePicker(props: DatePickerProps) {
    const {date,  clickState,onChange} = props;

    const preventEventBubbling = (e: React.MouseEvent) => {
        e.stopPropagation();  // 부모 컴포넌트로 이벤트 전파를 막음
    }



    return (
        <div id={"date-picker-wrapper"} onClick={preventEventBubbling}>
            <DatePicker className={"date-picker-container"}
                        selected={date}
                        onChange={onChange}
                        open={clickState}
                        popperClassName={date? "popper-offset" : ""}
                        dateFormat={"yyyy-MM-dd"}
                        minDate={new Date()}
            />
        </div>
    )
}