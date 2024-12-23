import "./style.css";
import SearchBar from "../../searchBar/searchBar";
import React, {ChangeEvent, useEffect, useState} from "react";
import CommonBtn from "../../btn";
import {modalStore} from "../../../store";
import {getProjectListRequest} from "../../../api/projectApi";
import {useCookies} from "react-cookie";
import {GetProjectListResponse, ResponseDto} from "../../../interface/response";
import ResponseCode from "../../../common/enum/responseCode";
import {ProjectListEle} from "../../../interface/types";
import {useNavigate, useParams} from "react-router-dom";
import {getProjectStatus, getProjectType} from "../../../constant/projectConstants";
import InitialsImg from "../../InitialsImg";
import {HOME_PATH, PERSONAL_PROJECT_BOARD_PATH} from "../../../constant/path";


export default function ProjectModal() {
    // navigate 함수
    const navigator = useNavigate();
    // pathVariable
    const {projectNum: pathId} = useParams();

    //* state :  받아올 프로젝트리스트 데이터 상태
    const [projects, setProjects] =
        useState<{ projects: ProjectListEle[], viewProjects: ProjectListEle[] }>({projects: [], viewProjects: []});
    //* state :  프로젝트 메뉴의 선택 상태
    const [menuItemSelectState, setMenuItemSelectState] =
        useState<{ projectNum: number, owner: string }>({projectNum: pathId ? parseInt(pathId, 10) : -1, owner: ""})
    //* state : 검색바 입력상태
    const [searchWord, setSearchWord] = useState<string>("");
    //* globalState: 모달상태
    const {setIsModalOpen, setModalType} = modalStore();
    //* 쿠키상태
    const [cookies, setCookies] = useCookies();

    const accessToken = cookies.accessToken_Main;

    // 검색어를 포함하는 항목을 필터링해서 보여주기 위한 객체들
    const filteredProjects = projects.viewProjects.filter((project) => {
        return (
            // 대소문자 구분을 업애기 위해서 영어는 모두 소문자로 변경해서
            project.projectName.toLowerCase().includes(searchWord.toLowerCase()) ||
            project.owner.toLowerCase().includes(searchWord.toLowerCase())
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


        const encodedEmail = btoa(menuItemSelectState.owner);
        navigator( HOME_PATH()+"/"+PERSONAL_PROJECT_BOARD_PATH(encodedEmail, String(menuItemSelectState.projectNum)));
    }


    // function : 프로젝트 리스트 데이터 처리함수
    const fetchProjectDataResponse = (responseBody: GetProjectListResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
        const {data} = responseBody as GetProjectListResponse;


        setProjects(prevState => ({
            viewProjects: [...data.list],
            projects: [...data.list]
        }))

    }

    type PrjListCompProps = {
        data: ProjectListEle,
        hooks: {
            setMenuItemSelectState: React.Dispatch<React.SetStateAction<{ projectNum: number, owner: string }>>
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
            owner,
            stat
        } = data;

        //eventHandler: 리스트 선택시 동작할 이벤드 헨들러;

        const onListSelectEventHandler = () => {
            const updateState = {projectNum : projectNum, owner : owner}
            setMenuItemSelectState(updateState);

        }


        return (
            <div className={"prj-li-comp-wrapper"}
                 onClick={onListSelectEventHandler}
                 style={{backgroundColor: isSelected ? "rgba(0,0,0,0.2)" : ""}}>
                <ul className={"prj-li-comp-ul"}>
                    <li className={"prj-modal-ul-li-title"}>{projectName}</li>
                    <li className={"prj-modal-ul-li-owner"}>
                        <InitialsImg name={owner} width={26} height={26}/>
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

    // 마운트시 실행할 함수.
    useEffect(() => {
        if (!accessToken) return;
        const fetchProjectData = async () => {
            const responseBody = await getProjectListRequest(accessToken);

            fetchProjectDataResponse(responseBody);

        }

        fetchProjectData()
    }, []);


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