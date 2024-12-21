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


export default function ProjectModal() {
    //* state :  받아올 프로젝트리스트 데이터 상태
    const [projects, setProjects] =
        useState<{ projects: ProjectListEle[], viewProjects: ProjectListEle[] }>({projects: [], viewProjects: []});
    //* state : 검색바 입력상태
    const [searchWord, setSearchWord] = useState<string>("");
    //* globalState: 모달상태
    const {setIsModalOpen, setModalType} = modalStore();
    //* 쿠키상태
    const [cookies, setCookies] = useCookies();

    const accessToken = cookies.accessToken_Main;

    //eventHandler: 검색바 입력 이벤트 헨들러
    const onSearchBarInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchWord(value);
    }

    //eventHandler : 닫기버튼 클릭 이벤트 헨들러
    const onCloseBtnClickEventHandler = () => {
        setModalType("");
        setIsModalOpen(false);
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
            viewProjects : [...data.list],
            projects: [...data.list]
        }))
    }

    // 프로젝트 리스트를 보여주는 자식 컴포넌트
    const PrjListComp = (props : ProjectListEle) => {

        const {projectNum,projectType,projectName,teamName,owner,stat} = props

        return (
            <div className={"prj-li-comp-wrapper"}>
                <ul className={"prj-li-comp-ul"}>
                    <li className={"prj-modal-ul-li-title"}>{projectName}</li>
                    <li className={"prj-modal-ul-li-owner"}>{owner}</li>
                    <li className={"prj-modal-ul-li-team"}>{teamName}</li>
                    <li className={"prj-modal-ul-li-type"}>{projectType}</li>
                    <li className={"prj-modal-ul-li-stat"}>{stat}</li>
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
                        {projects.viewProjects.map((item, index)=>
                        <PrjListComp projectNum={item.projectNum}
                                     projectName={item.projectName}
                                     owner={item.owner}
                                     projectType={item.projectType}
                                     stat={item.stat}
                                     teamName={item.teamName}/>)}
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
                        onClick={() => console.log("클릭")}/>
                </div>
            </div>


        </div>
    )
}