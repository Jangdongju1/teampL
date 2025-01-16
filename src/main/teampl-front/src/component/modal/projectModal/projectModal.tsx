import "./style.css";
import React, {ChangeEvent, useEffect, useState} from "react";
import {kanbanStore, modalStore} from "../../../store";
import {Project} from "../../../interface/types";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getProjectStatus, getProjectType} from "../../../constant/projectConstants";
import InitialsImg from "../../InitialsImg";
import {HOME_PATH, PERSONAL_PROJECT_BOARD_PATH, TEAM_PATH, TEAM_PROJECT_BOARD_PATH} from "../../../constant/path";
import prjListModalDataStore from "../../../store/prjListModalDataStore";
import SearchBar from "../../searchBar/searchBar";
import CommonBtn from "../../btn";


export default function ProjectModal() {
    // navigate 함수
    const navigator = useNavigate();

    // global State : 팀칸반인지 개인칸반인지 구분하기 위한 전역변수
    const {isTeamKanban} = kanbanStore();
    // pathVariable
    const {projectNum: pathId, regNum} = useParams();

    // //* state :  받아올 프로젝트리스트 데이터 상태
    // const [projects, setProjects] =
    //     useState<{ projects: Project[], viewProjects: Project[] }>({projects: [], viewProjects: []});

    //* global State: 모달에 표기할 프로젝트의 전역상태
    const {prjModalData} = prjListModalDataStore();


    //* state :  프로젝트 메뉴의 선택 상태
    const [menuItemSelectState, setMenuItemSelectState] =
        useState<{ projectNum: number, creator: string }>({projectNum: pathId ? parseInt(pathId, 10) : -1, creator: ""})


    //* state : 검색바 입력상태
    const [searchWord, setSearchWord] = useState<string>("");
    //* globalState: 모달상태
    const {setIsModalOpen, setModalType} = modalStore();




    // 검색어를 포함하는 항목을 필터링해서 보여주기 위한 객체들
    const filteredProjects = prjModalData.filter((project) => {
        return (
            // 대소문자 구분을 업애기 위해서 영어는 모두 소문자로 변경해서
            project.projectName.toLowerCase().includes(searchWord.toLowerCase()) ||
            project.creator.toLowerCase().includes(searchWord.toLowerCase())
        );
    });


    //eventHandler: 검색바 입력 이벤트 헨들러
    const onSearchBarInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length >= 50) return;  // 50 자 제한
        setSearchWord(value);

    }

    //eventHandler : 닫기버튼 클릭 이벤트 헨들러
    const onCloseBtnClickEventHandler = () => {
        setModalType("");
        setIsModalOpen(false);
    }

    // eventHandler : 목록 클릭시 이벤트 헨들러
    const onPrjListClickEventHandler = () => {
        // 모달창을 닫고
        setModalType("");
        setIsModalOpen(false);

        let path  = HOME_PATH();
        const encodedEmail = btoa(menuItemSelectState.creator);

        if (!isTeamKanban)
            path = `${path}/${PERSONAL_PROJECT_BOARD_PATH(encodedEmail, String(menuItemSelectState.projectNum))}`;
        else {
            if(!regNum) return;
            path = `${path}/${TEAM_PATH()}/${TEAM_PROJECT_BOARD_PATH(regNum,encodedEmail, String(menuItemSelectState.projectNum))}`
        }
        navigator(path);

    }



    type PrjListCompProps = {
        data: Project,
        hooks: {
            setMenuItemSelectState: React.Dispatch<React.SetStateAction<{ projectNum: number, creator: string }>>
        }
        isSelected: boolean;
    }
    // 프로젝트 리스트를 보여주는 자식 컴포넌트


    const PrjListComp = (props: PrjListCompProps) => {
        const {data, isSelected} = props;


        const {
            projectNum,
            projectType,
            projectName,
            teamName,
            creator,
            stat
        } = data;

        //eventHandler: 리스트 선택시 동작할 이벤드 헨들러;

        const onListSelectEventHandler = () => {
            const updateState = {projectNum : projectNum, creator : creator}
            setMenuItemSelectState(updateState);

        }


        return (
            <div className={"prj-li-comp-wrapper"}
                 onClick={onListSelectEventHandler}
                 style={{backgroundColor: isSelected ? "rgba(0,0,0,0.2)" : ""}}>
                <ul className={"prj-li-comp-ul"}>
                    <li className={"prj-modal-ul-li-title"}>{projectName}</li>
                    <li className={"prj-modal-ul-li-owner"}>
                        <InitialsImg name={creator} width={26} height={26}/>
                    </li>
                    <li className={"prj-modal-ul-li-team"}>{(teamName === null) || (teamName.length === 0) ? "-" : teamName}</li>
                    <li className={"prj-modal-ul-li-type"}>{getProjectType(projectType)}</li>
                    <li className={"prj-modal-ul-li-stat"}>
                        <div className={"prj-modal-ul-li-status"}
                             style={{backgroundColor: getProjectStatus(stat).color}}>
                            {getProjectStatus(stat).name}
                        </div>
                    </li>
                </ul>
            </div>
        )
    }



    return (
        <div className={"prj-modal-wrapper"}>

            <div className={"prj-modal-close-box"} onClick={onCloseBtnClickEventHandler}>
                <div className={"icon prj-modal-close-icon close-icon"}></div>
            </div>
            <div className={"prj-modal-title-box"}>

                <div className={"prj-modal-title"}>{"Project List"}</div>
            </div>

            <div className={"prj-modal-body"}>
                <div className={"prj-modal-search-bar"}>
                    <SearchBar value={searchWord}
                               onChange={onSearchBarInputChangeHandler}/>

                </div>


                <div className={"prj-modal-list-box"}>
                    <div className={"prj-modal-column-title"}>
                        <ul className={"prj-modal-title-ul"}>
                            <li className={"prj-modal-ul-li-title"}>{"Title"}</li>
                            <li className={"prj-modal-ul-li-owner"}>{"Owner"}</li>
                            <li className={"prj-modal-ul-li-team"}>{"Team"}</li>
                            <li className={"prj-modal-ul-li-type"}>{"Type"}</li>
                            <li className={"prj-modal-ul-li-stat"}>{"Status"}</li>
                        </ul>
                    </div>

                    <div className={"prj-modal-list-item-box"}>
                        {filteredProjects.map((item, index) =>
                            <PrjListComp
                                key={item.projectNum}
                                data={item}
                                hooks={{
                                    setMenuItemSelectState: setMenuItemSelectState
                                }}
                                isSelected={menuItemSelectState.projectNum === item.projectNum}/>)}
                    </div>
                </div>

                <div className={"prj-modal-button-box"}>
                    <CommonBtn
                        style={
                            {
                                size: {width: 200, height: 32},
                                btnName: "Go to Kanban",
                                backgroundColor: "#0C66E4",
                                hoverColor: "#0052CC",
                                hoverStyle: "background",
                                fontSize: 16,
                                fontColor: "rgba(255,255,255,1)"
                            }
                        }
                        onClick={onPrjListClickEventHandler}/>
                </div>
            </div>


        </div>
    )
}