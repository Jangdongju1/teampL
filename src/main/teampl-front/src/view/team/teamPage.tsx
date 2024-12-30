import "./style.css"
import SearchBar from "../../component/searchBar/searchBar";
import {ChangeEvent, useState} from "react";
import {Header, HeaderCell, HeaderRow, Table} from "@table-library/react-table-library";

export default function TeamPage() {
    // state: 검색어 상태
    const [searchWord, setSearchWord] = useState<string>("");

    // eventHandler : 검색바 변경 감지이벤트
    const onSearchWordChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setSearchWord(value);
    }


    // component : 참여중인 팀을 보여주는 table
    const TeamTable = () => {
        const tableHeader: string[] = ["TeamName", "Creator", "CreatDate", "Members","Projects"]
        return (


            <Table>
                <Header>
                    <HeaderRow>
                        {tableHeader.map((header, index)=>
                            <HeaderCell>{header}</HeaderCell>
                        )}
                    </HeaderRow>
                </Header>


            </Table>
        )
    }
    return (
        <div id={"team-page-wrapper"}>
            <div className={"team-page-top-container"}>
                <div className={"team-page-title-box"}>
                    <div className={"team-page-title"}>{"나의 팀 목록"}</div>
                    <SearchBar value={searchWord} onChange={onSearchWordChangeEventHandler}/>
                </div>
                <div className={"divider"}></div>
            </div>

            <div className={"team-page-bottom-container"}>
                {/*<TeamTable/>*/}
            </div>

        </div>
    )
}