import "./style.css"
import {ChangeEvent} from "react";

type SearchBarProps = {
    value: string,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({value,onChange}:SearchBarProps){
    return (
        <div className={"search-bar-box"}>
            <div className={"search-bar"}>
                <input className={"search-bar-input"} type={"text"} value={value}
                       onChange={onChange}/>
            </div>
            <div className={"icon search-icon-btn search-icon-btn"}></div>
        </div>
    )
}