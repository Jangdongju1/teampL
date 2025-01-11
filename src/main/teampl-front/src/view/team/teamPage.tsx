import "./style.css"
import SearchBar from "../../component/searchBar/searchBar";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library";
import {teamStore, userEmailStore} from "../../store";
import {useCookies} from "react-cookie";
import {getTeamListRequest} from "../../api/teamApi";
import {GetTeamResponse, ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import {useTheme} from "@table-library/react-table-library/theme";
import {getTheme} from "@table-library/react-table-library/baseline";
import {TeamTableData} from "../../interface/types";
import {getFormattedDate} from "../../util";
import useCSPagination from "../../hook/pagination/client/pagination_client";
import ClientSidePagination from "../../component/pagination/client";
import {useNavigate} from "react-router-dom";
import {TEAM_PROJECT_PATH} from "../../constant/path";

export default function TeamPage() {
    //네이게이트 함수
    const navigator = useNavigate();

    //* global state: 표기할 팀배열 상태
    const {teams, setTeams} = teamStore();

    // state: 검색어 상태
    const [searchWord, setSearchWord] = useState<string>("");

    // state : 쿠키상태 및 accessToken
    const [cookies, setCookies] = useCookies();
    const accessToken = cookies.accessToken_Main;

    // global state 로그인한 유저의 이메일
    const {loginUserEmail} = userEmailStore();

    // 불필요한 계산 방지
    const tableData = useMemo(() => {
        return teams.map(team => {
            const sequence = team.sequence.split("-")[1];  // 예외 처리 필요

            const item: TeamTableData = {
                regNum: team.regNum,
                teamName: team.teamName,
                sequence: sequence,
                creator: team.email,
                createDate: team.createDate,
                projects: team.projects,
                members: team.members,
                id: team.regNum, // id는 regNum과 동일
            };

            return item;
        });
    }, [teams]); // teams 배열이 변경될 때만 재계산


    // custom hook : pagination 훅
    const PER_PAGE = 10;
    const {
        currentPage,
        viewPageList,
        totalSection,
        currentSection,
        viewList,
        setCurrentPage,
        setCurrentSection,
        setTotalList
    } = useCSPagination<TeamTableData>(PER_PAGE);


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

        // 테이블의 프로젝트 클릭시 이벤트 헨들러
        const onTableElementClickEventHandler = (teamNum: number, creator: string) => {
            const encodedEmail = btoa(creator);
            navigator(`${TEAM_PROJECT_PATH(encodedEmail, String(teamNum))}`);
        }


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

                                <Row item={item}
                                     onClick={() => onTableElementClickEventHandler(item.regNum, item.creator)}>
                                    <Cell className={"common-table-body-cell draggable"}>{item.teamName}</Cell>
                                    <Cell className={"common-table-body-cell draggable"}>{item.sequence}</Cell>
                                    <Cell className={"common-table-body-cell draggable"}>{item.creator}</Cell>
                                    <Cell
                                        className={"common-table-body-cell draggable"}>{getFormattedDate(item.createDate)}</Cell>
                                    <Cell className={"common-table-body-cell draggable"}>{item.members}</Cell>
                                    <Cell className={"common-table-body-cell draggable"}>{item.projects}</Cell>
                                </Row>
                            )}

                        </Body>

                    </>
                )}


            </Table>
        )
    }

    // 팀관련 데이터 api 호출
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
    }, [loginUserEmail]);


    // 데이터가 바뀔 때마다  페이지네이션에 대한 데이터를 다시 세팅해야함.
    useEffect(() => {
        setTotalList(tableData)
    }, [teams]);

    // 검색바 상태에 따른 필터링된 데이터를 세팅
    useEffect(() => {
        const word = searchWord.trim();

        const filteredData =
            tableData.filter(team => team.teamName.includes(word) || String(team.sequence).includes(word));
        setTotalList(filteredData);
    }, [searchWord]);


    return (
        <div id={"team-page-wrapper"}>
            <div className={"team-page-top-container"}>
                <div className={"team-page-title-box"}>
                    <div className={"team-page-title"}>{"나의 팀 목록"}</div>

                    {teams.length === 0 ? null :
                        <SearchBar value={searchWord}
                                   onChange={onSearchWordChangeEventHandler}
                                   placeHolder={"팀이름 또는 시퀀스로 찾기"}/>
                    }


                </div>
                <div className={"divider"}></div>
            </div>

            {teams.length === 0 ? <div className={"team-page-data-null"}>{"참여중인 팀이 없습니다."}</div> :
                <div className={"team-page-bottom-container"}>
                    <div className={"team-page-bottom-table"}>
                        <TeamTable data={viewList}/>
                    </div>
                    <div className={"team-page-bottom-pagination"}>
                        <ClientSidePagination currentPage={currentPage}
                                              currentSection={currentSection}
                                              setCurrentPage={setCurrentPage}
                                              setCurrentSection={setCurrentSection}
                                              viewPageList={viewPageList}
                                              totalSection={totalSection}/>

                    </div>

                </div>
            }


        </div>
    )
}