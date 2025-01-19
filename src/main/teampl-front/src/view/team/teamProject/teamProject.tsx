import "./style.css"
import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import SearchBar from "../../../component/searchBar/searchBar";
import {kanbanStore, modalStore, teamProjectStore} from "../../../store";
import {useNavigate, useParams} from "react-router-dom";
import {ProjectTableData, TeamInfo, TeamMember} from "../../../interface/types";
import {useTheme} from "@table-library/react-table-library/theme";
import {getTheme} from "@table-library/react-table-library/baseline";
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library";
import CommonBtn from "../../../component/btn";
import {ModalType} from "../../../common";
import teamParamStore from "../../../store/teamParamStore";
import {useCookies} from "react-cookie";
import {getTeamProjectListRequest} from "../../../api/projectApi";
import GetTeamProjectListResponse from "../../../interface/response/project/getTeamProjectListResponse";
import {ResponseDto} from "../../../interface/response";
import ResponseCode from "../../../common/enum/responseCode";
import {getFormattedDate, getTableData} from "../../../util";
import {HOME_PATH, TEAM_PATH, TEAM_PROJECT_BOARD_PATH, TEAM_PROJECT_PATH} from "../../../constant/path";
import teamMemberMock from "../../../mock/teamMember.mock";
import {getTeamMemberListRequest} from "../../../api/teamApi";
import GetTeamMemberResponse from "../../../interface/response/team/getTeamMemberResponse";
import InitialsImg from "../../../component/InitialsImg";

export default function TeamProject() {
    // navigate 함수
    const navigator = useNavigate();
    // state: 검색바 입력상태
    const [searchWord, setSearchWord] = useState<string>("");
    // path variable
    const {email, regNum} = useParams();
    // state : 팀의정보 상태
    const [info, setInfo] = useState<TeamInfo | null>(null);

    // global state: 팀 프로젝트의 상태
    const {projects, setProjects} = teamProjectStore();
    // state : 팀 멤버 상태
    const [teamMember, setTeamMember ]= useState<TeamMember[]>([]);
    // 팀 멤버는 10명까지만 보이고 나머지는 더보기를 클릭했을때 보이도록 할 것이다.
    const displayTeamMember = teamMember.length >= 10? teamMember.slice(0,9) : teamMember;

    // global state : 팀 등록번호 저장을 위한 상태
    const {setTeamNumber} = teamParamStore();
    // 쿠키 상태
    const [cookies, setCookies] = useCookies();

    const accessToken = cookies.accessToken_Main;

    const {setIsModalOpen, setModalType} = modalStore();




    // 전역 프로젝트 상태에서 path variable에 맞는 배열을 찾아서 반환해서 보여주기
    // 종속배열로 안의 값이 변경될 때에만 다시 함수가 실행되도록.
    const projectTableData = useMemo(() => {
        const list = projects.filter(project => String(project.regNum) == regNum);

        return getTableData(list);

    }, [projects]);



    //function: 팀원 목록 요청에 대한 응답처리 함수.
    const getTeamMemberResponse = (responseBody : GetTeamMemberResponse | ResponseDto | null)=>{
        if (!responseBody) return;

        const {code,message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS){
            alert(message);
            return;
        }
        const {data} = responseBody as GetTeamMemberResponse;
        // 팀멤버를 가져오는 api호출 후 상태 세팅
        setTeamMember(data.list);
    }

    // function : 팀프로젝트 목록요청에 대한 응답함수
    const getTeamProjectListResponse = (responseBody: GetTeamProjectListResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
        const {data} = responseBody as GetTeamProjectListResponse;

        setProjects(data.list);
        setInfo(data.info);
    }

    //eventHandler: 검색바 입력시 변경이벤트
    const onSearchWordChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchWord(value);
    }

    //eventHandler : 팀프로젝트 생성 버튼 클릭 이벤트 헨들러
    const onTeamPrjCreateBtnClickEventHandler = () => {
        setModalType(ModalType.CREATE_TEAM_PROJECT);
        setIsModalOpen(true);
    }

    //eventHandler : 팀원초대 버튼 클릭 이벤트 헨들러
    const onTeamMemberInvitationBtnClickEventHandler = () => {
        setModalType(ModalType.TEAM_MEMBER_INVITATION);
        setIsModalOpen(true);
    }


    // 팀프로젝트 테이블 props
    type TeamTableProps = {
        data: ProjectTableData[]
    }

    // component : 팀프로젝트 테이블
    const TeamProjectTable = ({data}: TeamTableProps) => {
        const node = {nodes: data};


        // react table theme
        const theme = useTheme(getTheme());

        // react table 사이즈 재조정 가능 및 최소 사이즈는 25px;
        const resize = {minWidth: 25}

        const headers = ["ProjectName", "CreateDate", "Creator", "TeamName", "Stat", "Processed", "UnProcessed"]

        const onListClickEventHandler = (projectNum: number, creator: string) => {
            const encodedCreator = btoa(creator);
            if (!regNum) return;
            const path  = `${HOME_PATH()}/${TEAM_PATH()}/${TEAM_PROJECT_BOARD_PATH(regNum, encodedCreator, String(projectNum))}`
            navigator(path)
        }

        return (
            <Table data={node} theme={theme}>
                {(list: ProjectTableData[]) => (
                    <>
                        <Header>
                            <HeaderRow>
                                {headers.map((header, index) =>
                                    <HeaderCell key={index} className={"common-table-header"} resize={resize}>{header}</HeaderCell>
                                )}
                            </HeaderRow>
                        </Header>

                        <Body>
                            {list.map((projectData, index) =>
                                <Row key={index} item={projectData}
                                     onClick={() => onListClickEventHandler(projectData.projectNum, projectData.creator)}>
                                    <Cell
                                        className={"common-table-body-cell draggable"}>{projectData.projectName}</Cell>
                                    <Cell
                                        className={"common-table-body-cell draggable"}>{getFormattedDate(projectData.createDate)}</Cell>
                                    <Cell className={"common-table-body-cell draggable"}>{projectData.creator}</Cell>
                                    <Cell className={"common-table-body-cell draggable"}>{projectData.teamName}</Cell>
                                    <Cell className={"common-table-body-cell draggable"}>
                                        {projectData.stat === 0 ?
                                            <div className={"common-table-body-stat"}
                                                 style={{backgroundColor: "rgba(253,188,100)"}}>진행중</div> :
                                            <div className={"common-table-body-stat"}
                                                 style={{backgroundColor: "rgb(51, 211, 145)"}}>완료</div>}
                                    </Cell>
                                    <Cell className={"common-table-body-cell draggable"}>{projectData.processed}</Cell>
                                    <Cell
                                        className={"common-table-body-cell draggable"}>{projectData.unProcessed}</Cell>
                                </Row>
                            )}
                        </Body>
                    </>
                )}


            </Table>
        )
    }

    // 마운트시 실행할 함수 : 프로젝트의 정보와 프로젝트의 리스트를 가져오는 api호출
    useEffect(() => {
        if (!accessToken || !regNum) return;
        const fetchTeamProjectData = async () => {
            const responseBody = await getTeamProjectListRequest(regNum, accessToken);
            getTeamProjectListResponse(responseBody);
        }
        fetchTeamProjectData();
    }, [regNum]);// path variable 변경시 제호출 되어야 한다.


    useEffect(() => {
        if (!accessToken || !regNum) return;
        const fetchTeamMember = async () => {
            const responseBody = await getTeamMemberListRequest(regNum, accessToken);

            getTeamMemberResponse(responseBody);
        }
        fetchTeamMember();
    }, [regNum]);

    // 모달 전달용 전역상태 세팅
    useEffect(() => {
        if (!regNum) return;
        setTeamNumber(parseInt(regNum,10));
    }, [regNum]);



    return (
        <div id={"team-project-wrapper"}>

            <div className={"team-project-top-container"}>
                <div className={"team-project-title-box"}>
                    <div className={"team-project-title"}>{`팀명: ${info? info.teamName : ""}`}</div>
                    <div className={"team-project-search-bar"}>
                        <SearchBar value={searchWord}
                                   onChange={onSearchWordChangeEventHandler}
                                   placeHolder={"프로젝트 명으로 검색"}/>
                    </div>
                </div>
                <div className={"divider"}></div>
            </div>

            <div className={"team-project-bottom-container"}>
                {projectTableData.length === 0 ? <div className={"team-project-data-null"}>{"진행중인 프로젝트가 없습니다."} </div> :
                    <div className={"team-project-bottom-table"}>
                        <TeamProjectTable data={projectTableData}/>
                    </div>
                }


                <div className={"team-project-bottom-add-btn-box"}>
                    <CommonBtn
                        style={
                            {
                                size: {width: 160, height: 32},
                                btnName: "팀프로젝트 생성하기",
                                backgroundColor: "#0C66E4",
                                hoverColor: "#0052CC",
                                hoverStyle: "background",
                                fontSize: 16,
                                fontColor: "rgba(255,255,255,1)"
                            }
                        }
                        onClick={onTeamPrjCreateBtnClickEventHandler}/>
                </div>

                <div className={"team-project-member-title-box"}>
                    <div className={"team-project-member-title"}>{"참여중인 팀원"}</div>
                </div>
                <div className={"team-project-member-box"}>
                    <div className={"team-project-member"}>

                        <div className={"team-project-member-item-box"}>
                            <div className={"team-project-member-items"}>
                                {/*팀원이 10명 보다 많으면 슬라이스해서 10개만 보여줄 예정*/}
                                {displayTeamMember.map((item, index) => {
                                        return item.profileImg ?
                                            <div key={index} className={"team-project-member-item circle"}
                                                 style={{backgroundImage : `url(${item.profileImg})`}}></div> :
                                            <InitialsImg name={item.email} width={40} height={40}/>
                                    /*이니셜 이미지랑  닉네임이랑 같이 보여줄 필요가 있음*/
                                    })}
                            </div>
                            {teamMember.length < 10 ? null :
                                <div className={"team-project-member-more-btn"}>
                                    {"더보기"}
                                </div>}
                        </div>


                        <div className={"team-project-member-comment-box"}>
                            <CommonBtn
                                style={
                                    {
                                        size: {width: 120, height: 32},
                                        btnName: "팀원 초대",
                                        backgroundColor: "#0C66E4",
                                        hoverColor: "#0052CC",
                                        hoverStyle: "background",
                                        fontSize: 16,
                                        fontColor: "rgba(255,255,255,1)"
                                    }
                                }
                                onClick={onTeamMemberInvitationBtnClickEventHandler}/>
                        </div>

                    </div>

                </div>
            </div>


        </div>
    )
}