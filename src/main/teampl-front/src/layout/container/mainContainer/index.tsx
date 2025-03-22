import "./style.css";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import MainHeader from "../../header/mainHeader/mainHeader";
import {AUTH_PATH, HOME_PATH, SIGN_IN_PATH} from "../../../constant/path";
import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import {headerMenuStore} from "../../../store";
import CreationModal from "../../../component/modal/creationModal/creationModal";
import {ModalType} from "../../../common";
import IssueModal from "../../../component/modal/issueModal/issueModal";
import ProjectModal from "../../../component/modal/projectModal/projectModal";
import KanbanStore from "../../../store/kanbanStore";
import InvitationModal from "../../../component/modal/invitationModal/invitationModal";
import {useModal} from "../../../hook/modal";
import PassModification from "../../../component/modal/passwordModification/passModification";
import CommonBtn from "../../../component/btn";


export default function MainContainer() {
    // location  :  path값을 가져오는 함수
    const {pathname} = useLocation();
    // navigate : 네비게이트 함수
    const navigator = useNavigate();
    // state : 쿠키상태
    const [cookies, setCookies] = useCookies();
    // const : 로딩상태
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 커스텀 모달 훅;
    const {isModalOpen,modalType} = useModal();
    // global State : 메뉴 오픈에 관한 전역상태
    const {
        teamBtnClickState,
        currentBtnClickState,
        personalPrjBtnClickState,
        setPersonalPrjBtnClickState,
        setTeamBtnClickState,
        setCurrentBtnClickState
    } = headerMenuStore();
    // state : 헤더메뉴 오픈 상태
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // global State : 칸반 모달에 관련된 글로벌 상태
    const {kanbanData,setKanbanData,isTeamKanban} = KanbanStore();

    //* eventHandler : 메인 컨테이너 클릭 이벤트헨들러 > 컨테이너를 클릭하면 상단 메뉴가 닫혀야 한다.
    const onMainContainerClickEventHandler = () => {
        if (teamBtnClickState || currentBtnClickState || personalPrjBtnClickState){
            setCurrentBtnClickState(false);
            setPersonalPrjBtnClickState(false);
            setTeamBtnClickState(false);
        }
    }


    // useEffect
    useEffect(() => {
        if (!cookies.accessToken_Main) {
            navigator(`${AUTH_PATH()}/${SIGN_IN_PATH()}`)
            return;
        }
        setIsLoading(true);


    }, [cookies.accessToken_Main]);

    // 모달오픈시 화면블러처리
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("body-blackout-style");
        } else {
            document.body.classList.remove("body-blackout-style");
        }
        return () => {
            document.body.classList.remove('body-blur');
        };
    }, [isModalOpen]);



    if (pathname === `${HOME_PATH()}`) return null;
    if (!isLoading) return null;


    return (
        <>
            {isModalOpen && <div className="body-blackout-style"/>}
            <MainHeader/>

            {isModalOpen && modalType === ModalType.CREATE_PROJECT && (
                <CreationModal title={"Create Project"}
                               comment={"개인용 프로젝트를 생성합니다."}
                               nameLabel={"Project Name"}
                               nameToolTip={"이 프로젝트를 누가 보나요?"}
                               createBtnName={"프로젝트 생성"}
                               modalType={ModalType.CREATE_PROJECT}/>
            )}

            {isModalOpen && modalType === ModalType.PROJECT_LIST && (<ProjectModal/>)}

            {isModalOpen && modalType === ModalType.ISSUE_INFO && (
                <IssueModal
                    isTeamModal={isTeamKanban}
                    eachKanbanIssues={kanbanData}
                    setEachKanbanIssues={setKanbanData}/>
            )}

            {isModalOpen && modalType === ModalType.CREATE_TEAM && (
                <CreationModal title={"Create Team"}
                               comment={"팀을 생성합니다 "}
                               nameLabel={"Team Name"}
                               nameToolTip={"팀은 왜 생성하나요?"}
                               createBtnName={"팀 생성"}
                               modalType={ModalType.CREATE_TEAM}/>
            )}

            {isModalOpen && modalType === ModalType.CREATE_TEAM_PROJECT && (
                <CreationModal title={"Create Team Project"}
                               comment={"팀 프로젝트를 생성합니다. "}
                               nameLabel={"Team Name"}
                               nameToolTip={"팀프로젝트는 무엇인가요?"}
                               createBtnName={"프로젝트 생성"}
                               modalType={ModalType.CREATE_TEAM_PROJECT}/>
            )}

            {isModalOpen && modalType === ModalType.TEAM_MEMBER_INVITATION && (<InvitationModal/>)}

            {isModalOpen && modalType === ModalType.PASS_MODIFICATION &&(<PassModification/>)}



            <div id={"main-wrapper"}>
                <div className={"main-container"} onClick={onMainContainerClickEventHandler}>
                    <div className={"main-left-container"}>
                        <Outlet/>
                    </div>




                    <div className={"main-right-container"}>
                        <div className={"main-right-ad-container"}>
                            <div className={"main-right-template-banner-box"}>
                                <div className={"templates-banner-box templates-banner"}></div>
                            </div>

                            <div className={"main-right-banner-text"}>{"미리 작성된 템플릿을 이용하여 워크플로우를 강화하세요."}</div>

                            <CommonBtn
                                style={
                                    {
                                        size: {width: 276, height: 40},
                                        btnName: "더 많은 템플릿 탐색   ",
                                        hoverStyle: "background",
                                        fontSize: 16,
                                        fontColor: "rgba(0,0,0,0.8)",
                                        border : "1px solid rgba(0,0,0,0.7)"

                                    }
                                }
                                onClick={()=> console.log("템플릿 오픈")}/>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}