import "./style.css"
import {ChangeEvent, useState} from "react";
import SearchBar from "../../component/searchBar/searchBar";

export default function TeamProject() {
    // state: 검색바 입력상태
    const [searchWord, setSearchWord] = useState<string>("");

    //eventHandler: 검색바 입력시 변경이벤트
    const onSearchWordChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchWord(value);
    }
    return (
        <div id={"team-project-wrapper"}>
            <div className={"team-project-top-container"}>
                <div className={"team-project-title-box"}>
                    <div className={"team-project-title"}>{"팀명"}</div>
                    <div className={"team-project-search-bar"}>
                        <SearchBar value={searchWord}
                                   onChange={onSearchWordChangeEventHandler}
                                   placeHolder={"프로젝트 명으로 검색"}/>
                    </div>
                </div>
                <div className={"divider"}></div>
            </div>
        </div>
    )
}