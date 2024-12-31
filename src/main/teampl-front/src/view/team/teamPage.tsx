import "./style.css"
import SearchBar from "../../component/searchBar/searchBar";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library";
import {teamStore} from "../../store";
import {useCookies} from "react-cookie";
import {getTeamListRequest} from "../../api/teamApi";
import {CreateTeamResponse, GetTeamResponse, ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import modalType from "../../common/enum/modalType";
import {useTheme} from "@table-library/react-table-library/theme";
import {getTheme} from "@table-library/react-table-library/baseline";
import {Team, TeamTableData} from "../../interface/types";
import {getFormattedDate} from "../../util";

export default function TeamPage() {

    //* global state: 표기할 팀배열 상태
    const {teams, setTeams} = teamStore();

    // state: 검색어 상태
    const [searchWord, setSearchWord] = useState<string>("");

    // state : 쿠키상태 및 accessToken
    const [cookies, setCookies] = useCookies();
    const accessToken = cookies.accessToken_Main;


    // 불필요한 계산 방지
    const tableData = useMemo(() => {
        return teams.map(team => {
            const sequence = team.sequence.split("-")[1];  // 예외 처리 필요

            const item: TeamTableData = {
                regNum: team.regNum,
                teamName: team.teamName,
                sequence: sequence,
                creator : team.email,
                createDate: team.createDate,
                projects: team.projects,
                members: team.members,
                id: team.regNum, // id는 regNum과 동일
            };

            return item;
        });
    }, [teams]); // teams 배열이 변경될 때만 재계산

    // eventHandler : 검색바 변경 감지이벤트
    const onSearchWordChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setSearchWord(value);
    }

    //function : 팀리스트 요청에 대한 응답처리함수
    const getTeamListResponse = (responseBody: GetTeamResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetTeamResponse;

        // 상태 새팅
        setTeams(data.list);
    }

    type TeamTableProps = {
        data: TeamTableData[];
    }
    // component : 참여중인 팀을 보여주는 table
    const TeamTable = ({data}: TeamTableProps) => {
        const tableHeader: string[] = ["TeamName", "Sequence", "Creator", "CreatDate", "Members", "Projects"]
        const node = {nodes: data};

        const theme = useTheme(getTheme());
        const resize = {minWidth: 25}
        return (


            <Table data={node} theme={theme}>
                {(list: TeamTableData[]) => (
                    <>
                        <Header>
                            <HeaderRow>
                                {tableHeader.map((header, index) =>
                                    <HeaderCell className={"common-table-header"} resize={resize}>{header}</HeaderCell>
                                )}
                            </HeaderRow>
                        </Header>
                        <Body>
                            {list.map((item, index) =>

                                <Row item={item}>
                                    <Cell className={"common-table-body-cell"}>{item.teamName}</Cell>
                                    <Cell className={"common-table-body-cell"}>{item.sequence}</Cell>
                                    <Cell className={"common-table-body-cell"}>{item.creator}</Cell>
                                    <Cell className={"common-table-body-cell"}>{getFormattedDate(item.createDate)}</Cell>
                                    <Cell className={"common-table-body-cell"}>{item.members}</Cell>
                                    <Cell className={"common-table-body-cell"}>{item.projects}</Cell>
                                </Row>
                            )}

                        </Body>

                    </>
                )}


            </Table>
        )
    }

    useEffect(() => {
        const fetchTeamData = async () => {
            if (!accessToken) {
                alert("Access Token is Expired!!");
                return
            }
            const responseBody = await getTeamListRequest(accessToken);

            getTeamListResponse(responseBody);

        }

        fetchTeamData()
    }, []);
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
                <TeamTable data={tableData}/>
            </div>

        </div>
    )
}