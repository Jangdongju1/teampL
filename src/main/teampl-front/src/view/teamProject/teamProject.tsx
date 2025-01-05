import "./style.css"
import React, {ChangeEvent, useMemo, useState} from "react";
import SearchBar from "../../component/searchBar/searchBar";
import {modalStore, projectStore} from "../../store";
import {useParams} from "react-router-dom";
import {ProjectTableData, Team} from "../../interface/types";
import {useTheme} from "@table-library/react-table-library/theme";
import {getTheme} from "@table-library/react-table-library/baseline";
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library";
import CommonBtn from "../../component/btn";
import {ModalType} from "../../common";
import teamParamStore from "../../store/teamParamStore";

export default function TeamProject() {
    // state: 검색바 입력상태
    const [searchWord, setSearchWord] = useState<string>("");
    // path variable
    const {email, regNum} = useParams();
    // global state: 프로젝트의 상태
    const {projects, setProjects} = projectStore();
    // global state: 모달상태
    const {setModalType,setIsModalOpen} = modalStore();
    // global state : 팀 등록번호 저장을 위한 상태
    const {teamNumber,setTeamNumber} = teamParamStore();


    // // 전역 프로젝트 상태에서 path variable에 맞는 배열을 찾아서 반환해서 보여주기
    // // 종속배열로 안의 값이 변경될 때에만 다시 함수가 실행되도록.
    // const projectTableData = useMemo(() => {
    //     return projects.team.filter(project => String(project.regNum) == regNum);
    // }, [projects]);
    //

    //eventHandler: 검색바 입력시 변경이벤트
    const onSearchWordChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchWord(value);
    }

    //eventHandler : 팀프로젝트 생성 버튼 클릭 이벤트 헨들러
    const onTeamPrjCreateBtnClickEventHandler = ()=>{
        if (regNum) console.log(regNum)
        setTeamNumber(regNum? parseInt(regNum, 10) : null);
        setModalType(ModalType.CREATE_TEAM_PROJECT);
        setIsModalOpen(true);
    }
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


        return (
            <Table data={node} theme={theme}>
                {(list: ProjectTableData[]) => (
                    <>
                        <Header>
                            <HeaderRow>
                                {headers.map(header =>
                                    <HeaderCell className={"common-table-header"} resize={resize}>{header}</HeaderCell>
                                )}
                            </HeaderRow>
                        </Header>

                        <Body>
                            {list.map(projectData =>
                                <Row item={projectData}>
                                    <Cell
                                        className={"common-table-body-cell draggable"}>{projectData.projectName}</Cell>
                                    <Cell className={"common-table-body-cell draggable"}>{projectData.createDate}</Cell>
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
    return (
        <div id={"team-project-wrapper"}>

            <div className={"team-project-top-container"}>
                <div className={"team-project-title-box"}>
                    <div className={"team-project-title"}>{"팀명의 진행중인 프로젝트"}</div>
                    <div className={"team-project-search-bar"}>
                        <SearchBar value={searchWord}
                                   onChange={onSearchWordChangeEventHandler}
                                   placeHolder={"프로젝트 명으로 검색"}/>
                    </div>
                </div>
                <div className={"divider"}></div>
            </div>

            <div className={"team-project-bottom-container"}>
                {/*{projectTableData.length === 0 ? <div className={"team-project-data-null"}>{"진행중인 프로젝트가 없습니다."} </div> :*/}
                {/*    <div className={"team-project-bottom-table"}>*/}
                {/*        <TeamProjectTable data={projectTableData}/>*/}
                {/*    </div>*/}
                {/*}*/}


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
            </div>


        </div>
    )
}