import "./style.css";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {personalPrjStore, userEmailStore} from "../../store";
import {useNavigate} from "react-router-dom";
import personalProjectListMock from "../../mock/personalProjectList.mock";
import {Project} from "../../interface/types";
import {
    Body,
    Cell,
    Header,
    HeaderCell,
    HeaderCellProps,
    HeaderRow,
    Row,
    Table
} from "@table-library/react-table-library";
import styled from "styled-components";
import {useTheme} from "@table-library/react-table-library/theme";
import {getTheme} from "@table-library/react-table-library/baseline";


export default function PersonalProject() {
    //* navigate : 네비게이트 함수
    const navigator = useNavigate();
    // global state : 개인프로젝트의 상태
    const {projects, setProjects} = personalPrjStore();
    // global state : 유저의 이메일 상태
    const {loginUserEmail} = userEmailStore();
    // state : 쿠키 상태
    const [cookies, setCookies] = useCookies();

    //* state: 상단 드롭다운 관련 값들
    const menus = ["Personal", "Team"];
    const [menu, setMenu] = useState<{
        clickStat: boolean, menuStat: "Personal" | "Team"
    }>({clickStat: false, menuStat: "Personal"});

    // table info : 프로젝트 관련 테이블의 정보

    // react-table을 사용하기 위해선 data와 테이블 헤더에 들어갈 column이 필요함.
    const baseTableColumns = () => {
        const columns = [
            {label: "projectName", renderCell: (item: Project) => item.projectName},
            {label: "creator", renderCell: (item: Project) => item.creator},
            {label: "teamName", renderCell: (item: Project) => item.teamName},
            {label: "stat", renderCell: (item: Project) => item.stat},
            {label: "createDate", renderCell: (item: Project) => item.createDate},
            {label: "processed", renderCell: (item: Project) => item.processed},
            {label: "unProcessed", renderCell: (item: Project) => item.unProcessed},
        ];

        return menu.menuStat === "Team" ? columns :
            columns.filter(column => column.label !== "teamName");
    }

    const list = personalProjectListMock;

    // const data = {nodes : list};

    // 테이블 관련 props끝


    // eventHandler : 드롭다운 메뉴 클릭 이벤트 헨들러
    const onDropDownBtnClickEventHandler = () => {
        const updateState = {
            ...menu,
            clickStat: !menu.clickStat
        }

        setMenu(updateState);
    }

    // component : 하단 표 컴포넌트

    type ProjectTableProps = {
        columns: { label: string, renderCell: (item: Project) => string | number }[],
        data: Project[];
    }
    const ProjectTable = ({columns, data}: ProjectTableProps) => {
        const node = {nodes: data};
        const theme = useTheme(getTheme());

        const resize = {minWidth : 25}


        return (
            <Table data={node} theme={theme}>
                {(list: Project[]) => (
                    <>
                        <Header>
                            <HeaderRow className={"prj-table-header-row"}>
                                {columns.map((item, index) =>
                                    <HeaderCell resize={resize} className={"prj-table-header"} key={index}>{item.label}</HeaderCell>
                                )}
                            </HeaderRow>
                        </Header>

                        <Body>
                            {list.map((project, index) =>
                                <Row key={project.projectNum} item={project}>

                                    <Cell className={"prj-table-body-cell"}>{project.projectName}</Cell>
                                    <Cell className={"prj-table-body-cell"}>{project.creator}</Cell>
                                    {menu.menuStat === "Team" ? <Cell className={"prj-table-body-cell"}>{project.teamName}</Cell> : null}
                                    <Cell className={"prj-table-body-cell"}>{project.stat}</Cell>
                                    <Cell className={"prj-table-body-cell"}>{project.createDate}</Cell>
                                    <Cell className={"prj-table-body-cell"}>{project.processed}</Cell>
                                    <Cell className={"prj-table-body-cell"}>{project.unProcessed}</Cell>
                                </Row>
                            )}

                        </Body>
                    </>
                )}
            </Table>
        )
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


    useEffect(() => {
        // const fetchData = async () => {
        //     const token = cookies.accessToken_Main;
        //     if (!token) return;
        //
        //     const responseBody = await getPersonalPrjListRequest(token);
        //     getPersonalPrjResponse(responseBody);
        // };
        //
        // fetchData();
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
                    {/*<CompactTable columns={baseTableColumns()} data ={data} />*/}
                    <ProjectTable columns={baseTableColumns()} data={list}/>
                </div>

            </div>


        </div>
    )
}