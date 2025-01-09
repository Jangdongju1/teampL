import "./style.css";
import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {useCookies} from "react-cookie";
import {projectStore, userEmailStore} from "../../store";
import {useNavigate} from "react-router-dom";
import {getProjectListRequest} from "../../api/projectApi";
import {GetPrjListPaginationResponse, ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import {Project, ProjectTableData} from "../../interface/types";
import {ProjectType} from "../../common";
import ProjectTable from "../../component/table/projectTable/projectTable";
import ClientSidePagination from "../../component/pagination/client";
import useCSPagination from "../../hook/pagination/client/pagination_client";
import SearchBar from "../../component/searchBar/searchBar";
import {getTableData} from "../../util";


export default function PersonalProject() {
    //* navigate : 네비게이트 함수
    const navigator = useNavigate();
    // global state : 유저의 이메일 상태
    const {loginUserEmail} = userEmailStore();
    // state : 쿠키 상태
    const [cookies, setCookies] = useCookies();
    const accessToken = cookies.accessToken_Main;

    //* state: 상단 드롭다운 관련 상태값들
    const menus = ["Personal", "Team"];

    const [menu, setMenu] = useState<{
        clickStat: boolean, menuStat: "Personal" | "Team"
    }>({clickStat: false, menuStat: "Personal"});

    // global state : 표에 표기할 프로젝트 데이터 관련상태.
    const {projects, setProjects} = projectStore();


    //state : 하단 페이지네이션 상태값들 전체 리스트의 갯수 + 한페이지에 표기할 갯수로 현재 표기할 페이지네이션의 숫자를 계산해줌
    const PER_PAGE = 10;
    const {
        currentPage,
        totalSection,
        viewList,
        viewPageList,
        currentSection,
        setCurrentPage,
        setCurrentSection,
        setTotalList
    } = useCSPagination<ProjectTableData>(PER_PAGE);

    // state : 검색바 입력상태
    const [searchWord, setSearchWord] = useState<string>("");

    // tableHeaders : 메인페이지 테이블 헤더
    const projectTableHeader = ["ProjectName", "CreateDate", "Creator", "TeamName", "Stat", "Processed", "UnProcessed"]

    const projectTableData = useMemo(() => {

        const personalTableData = getTableData(projects.personal);
        const teamTableData = getTableData(projects.team);

        return {personal: personalTableData, team: teamTableData};
    }, [projects])


    //menuStat 별 데이터
    const dataByMenu = ()=>{
        return menu.menuStat ==="Personal"? projectTableData.personal : projectTableData.team;
    }



    // eventHandler : 드롭다운 메뉴 클릭 이벤트 헨들러
    const onSearchbarChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchWord(value)
    }
    // eventHandler : 드롭다운 메뉴 클릭 이벤트 헨들러
    const onDropDownBtnClickEventHandler = () => {
        const updateState = {
            ...menu,
            clickStat: !menu.clickStat
        }

        setMenu(updateState);
    }
    // eventHandler : 테이블 메뉴 선택시 이벤트 헨들러 >> 페이지 이동 처리.
    const onTableClickEventHandler = (projectNum: number, owner: string, regNum?: number) => {
        const encodedEmail = btoa(owner);
        navigator(`${String(projectNum)}`);
    }


    // component : 드롭다운 메뉴 컴포넌트
    type HomeDropDownProps = {
        menuList: string[],
        hooks: {
            menu: { clickStat: boolean, menuStat: "Personal" | "Team" },
            setMenu: React.Dispatch<React.SetStateAction<{ clickStat: boolean, menuStat: "Personal" | "Team" }>>
        }
    }

    const HomePrjDropDown = (props: HomeDropDownProps) => {
        const {menuList, hooks} = props;
        const {menu, setMenu} = hooks;

        // eventHandler : 메뉴 클릭시 이벤트 헨들러
        const onMenuClickEventHandler = (value: "Personal" | "Team") => {
            const updateStat = {...menu, clickStat: !menu.clickStat, menuStat: value};
            setMenu(updateStat);
        }

        return (
            <div id={"home-prj-drop-down-wrapper"}>
                {menuList.map((item, index) =>
                    <div key={index} className={"home-prj-drop-down-menu-item-box"}
                         onClick={() => onMenuClickEventHandler(item as "Personal" | "Team")}>
                        <div className={"home-prj-drop-down-menu-item"}>{item}</div>
                    </div>
                )}
            </div>
        )
    }

    // function : project 상태 업데이트
    const updateProjectState = (list: Project[]) => {
        const personal = list.filter(project => project.projectType === ProjectType.PERSONAL_PROJECT);
        const team = list.filter(project => project.projectType === ProjectType.TEAM_PROJECT);

        const updateState = {
            total: list,
            personal: personal,
            team: team
        }
        setProjects(updateState);
    }


    // function : fetchData 에 대한 응답 처리 함수.
    const getProjectListResponse = (responseBody: GetPrjListPaginationResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetPrjListPaginationResponse;

        updateProjectState(data.list);

    }
    // 마운트시 실행할 함수
    useEffect(() => {
        const fetchProjectData = async () => {
            if (!accessToken) {
                alert("accessToken is expired!!")
                return;
            }
            const responseBody = await getProjectListRequest(accessToken);

            await getProjectListResponse(responseBody);

        }
        fetchProjectData();

    }, []);


    useEffect(() => {
        setTotalList(menu.menuStat === "Team"? projectTableData.team : projectTableData.personal);
    }, [projectTableData, menu.menuStat]);

    // 검색필터의 상태가 바뀔때마다 재차 세팅 해줌
    useEffect(() => {
        const word = searchWord.trim()
        const viewData = dataByMenu().filter(project => project.projectName.toLowerCase().includes(word));
        setTotalList(viewData);
    }, [searchWord]);


    return (
        <div id={"personal-project-wrapper"}>

            <div className={"home-prj-top-container"}>
                <div className={"home-prj-drop-btn-box"}>
                    <div className={"home-prj-drop-down-title"}>{menu.menuStat}</div>
                    <div className={"icon home-prj-drop-down-btn arrow-down-icon"}
                         onClick={onDropDownBtnClickEventHandler}/>
                </div>
                {menu.clickStat && (
                    <HomePrjDropDown menuList={menus}
                                     hooks={{
                                         menu: menu,
                                         setMenu: setMenu
                                     }}/>
                )}

            </div>

            <div className={"home-prj-bottom-container"}>
                <div className={"home-prj-bottom-title-box"}>
                    <div className={"home-prj-bottom-title-frame"}>
                        <div className={"home-prj-bottom-title"}>{
                            menu.menuStat === "Personal" ? "개인 프로젝트 목록" : "팀 프로젝트 목록"
                        }</div>
                        {(projects.team.length === 0 && projects.personal.length ===0)? null :
                            <SearchBar value={searchWord} onChange={onSearchbarChangeEventHandler} placeHolder={"프로젝트 명"}/>
                        }

                    </div>

                    <div className={"divider"}></div>
                </div>

                {dataByMenu().length === 0 ? <div className={"home-table-data-null"}>{"진행중인 프로젝트가 없습니다."}</div> :

                    <div className={"home-prj-bottom-table-box"}>
                        <div className={"home-prj-bottom-table"}>
                            <ProjectTable header={projectTableHeader}
                                          data={viewList}
                                          tableType={menu.menuStat}
                                          functions={{
                                              onClick: onTableClickEventHandler
                                          }}/>
                        </div>
                        <div className={"home-prj-bottom-pagination"}>
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


        </div>
    )
}