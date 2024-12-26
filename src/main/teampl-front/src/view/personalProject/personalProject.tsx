import "./style.css";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {projectStore, userEmailStore} from "../../store";
import {useNavigate} from "react-router-dom";
import {getTProjectListRequest} from "../../api/projectApi";
import {GetPersonalPrjListResponse, ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import {Project, ProjectTableData} from "../../interface/types";
import {ProjectType} from "../../common";
import projectType from "../../common/enum/projectType";
import ProjectTable from "../../component/table/projectTable/projectTable";


export default function PersonalProject() {
    //* navigate : 네비게이트 함수
    const navigator = useNavigate();

    const {projects, setProjects} = projectStore();
    // global state : 유저의 이메일 상태
    const {loginUserEmail} = userEmailStore();
    // state : 쿠키 상태
    const [cookies, setCookies] = useCookies();
    const accessToken = cookies.accessToken_Main;


    //* state: 상단 드롭다운 관련 값들
    const menus = ["Personal", "Team"];
    const [menu, setMenu] = useState<{
        clickStat: boolean, menuStat: "Personal" | "Team"
    }>({clickStat: false, menuStat: "Personal"});


    // tableHeaders
    const projectTableHeader = ["ProjectName", "CreateDate", "Creator", "TeamName", "Stat", "Processed", "UnProcessed"]

    // const projectMockData = personalProjectListMock;  // 실제 프로젝트 리스트에 대한 응답값 모의데이터

    // eventHandler : 드롭다운 메뉴 클릭 이벤트 헨들러
    const onDropDownBtnClickEventHandler = () => {
        const updateState = {
            ...menu,
            clickStat: !menu.clickStat
        }

        setMenu(updateState);
    }
    // eventHandler : 테이블 메뉴 선택시 이벤트 헨들러 >> 페이지 이동 처리.
    const onTableClickEventHandler = (projectNum: number, regNum?: number) => {
        console.log(projectNum, regNum);
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
                    <div className={"home-prj-drop-down-menu-item-box"}
                         onClick={() => onMenuClickEventHandler(item as "Personal" | "Team")}>
                        <div className={"home-prj-drop-down-menu-item"}>{item}</div>
                    </div>
                )}
            </div>
        )
    }

    // function : project상태 업데이트
    const updateProjectState = (list: Project[]) => {


        const tableDataArr = list.map(project => {
            const tableData: ProjectTableData = {
                projectNum: project.projectNum,
                regNum: project.regNum,
                projectName: project.projectName,
                description: project.description,
                createDate: project.createDate,
                creator: project.creator,
                teamName: project.teamName,
                stat: project.stat,
                projectType: project.projectType,
                processed: project.processed,
                unProcessed: (project.totalIssueCnt - project.processed),
                id: project.projectNum
            }

            return tableData;
        });


        const totalData = tableDataArr;
        const personal =
            tableDataArr.filter(item => item.projectType === ProjectType.PERSONAL_PROJECT);
        const team =
            tableDataArr.filter(item => item.projectType === ProjectType.TEAM_PROJECT);

        const updateState = {
            projects: totalData,
            personal: personal,
            team: team
        }

        setProjects(updateState);
    }

    console.log(projects)

    // function : fetchData 에 대한 응답 처리 함수.
    const getProjectListResponse = (responseBody: GetPersonalPrjListResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetPersonalPrjListResponse;

        updateProjectState(data.list);

    }
    // 마운트시 실행할 함수
    useEffect(() => {
        const fetchProjectData = async () => {
            if (!accessToken) {
                alert("accessToken is expired!!")
                return;
            }
            const responseBody = await getTProjectListRequest(accessToken);

            getProjectListResponse(responseBody);
        }
        fetchProjectData();
    }, []);

    return (
        <div id={"personal-project-wrapper"}>

            <div className={"home-prj-top-container"}>
                <div className={"home-prj-drop-btn-box"}>
                    <div className={"home-prj-drop-down-title"}>{"Personal"}</div>
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
                    <div className={"home-prj-bottom-title"}>{
                        menu.menuStat === "Personal" ? "개인 프로젝트 목록" : "팀 프로젝트 목록"
                    }</div>
                    <div className={"divider"}></div>
                </div>

                <div className={"home-prj-bottom-table-box"}>
                    <ProjectTable header={projectTableHeader}
                                  data={menu.menuStat === "Team"? projects.team : projects.personal} tableType={menu.menuStat}
                                  functions={{
                                     onClick: onTableClickEventHandler
                                 }}/>
                </div>

            </div>


        </div>
    )
}