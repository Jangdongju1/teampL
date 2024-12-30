import "./style.css";
import InitialsImg from "../../../component/InitialsImg";
import {useNavigate} from "react-router-dom";
import {modalStore, userEmailStore} from "../../../store";
import headerMenuStore from "../../../store/headerMenuStore";
import {HOME_PATH, PERSONAL_PROJECT_HOME_PATH, TEAM_MAIN_PATH} from "../../../constant/path";
import ModalType from "../../../common/enum/modalType";
import ProjectModal from "../../../component/modal/projectModal/projectModal";

export default function MainHeader() {

    // navigate 함수 : 페이지 이동
    const navigator = useNavigate();
    // global State : 모달창에 대한 전역상태
    const {modalType, setIsModalOpen, setModalType} = modalStore();
    // global State : 헤더 메뉴 오픈 상태
    const {
        currentBtnClickState,
        personalPrjBtnClickState,
        teamBtnClickState,
        setTeamBtnClickState,
        setCurrentBtnClickState,
        setPersonalPrjBtnClickState
    } = headerMenuStore();

    // global state : 로그인한 유저의 이메일 상태
    const {loginUserEmail} = userEmailStore();

    // eventHandler : 버튼 클릭시 다른 메뉴 상태를 false로
    const onMenuBtnClickEventHandler = (btnType: string) => {
        setTeamBtnClickState(btnType === "team" ? !teamBtnClickState : false);
        setCurrentBtnClickState(btnType === "current" ? !currentBtnClickState : false);
        setPersonalPrjBtnClickState(btnType === "personal" ? !personalPrjBtnClickState : false);
    }

    const onTeamBtnClickEventHandler = () => {
        onMenuBtnClickEventHandler("team");

    }
    const onCurrentBtnClickEventHandler = () => {
        onMenuBtnClickEventHandler("current");

    }
    const onPersonalPrjBtnClickEventHandler = () => {
        onMenuBtnClickEventHandler("personal");
    }

    // eventHandler : 개인프로젝트 > 프로젝트 목록 버튼 클릭 이벤트 헨들러
    const onHomeBtnClickEventHandler = () => {
        const encodedEmail = btoa(loginUserEmail);
        navigator(HOME_PATH() + "/" + PERSONAL_PROJECT_HOME_PATH(encodedEmail));
    }

    // eventHandler : 프로젝트 목록 클릭 이벤트 헨들러
    const onPrjBtnClickEventHandler = () => {
        setPersonalPrjBtnClickState(false);
        setModalType(ModalType.PROJECT_LIST);
        setIsModalOpen(true);
    }

    const TeamDetailComp = () => {
        // eventHandler : 팀 생성 버튼 클릭 이벤트 헨들러
        const onTeamCreationBtnClickEventHandler = ()=>{
            setTeamBtnClickState(false); // 메뉴 닫기
            setModalType(ModalType.CREATE_TEAM);
            setIsModalOpen(true);
        }

        // eventHandler : 나의 팀 버튼 클릭 이벤트 헨들러
        const onMyTeamBtnClickEventHandler = ()=>{
            const encodedEmail = btoa(loginUserEmail);
            navigator(HOME_PATH()+"/"+TEAM_MAIN_PATH(encodedEmail))
        }
        return (
            <div className={"team-detail-wrapper"}>
                <ul className={"team-detail-menu"}>
                    <li onClick={onMyTeamBtnClickEventHandler}><span className={"icon my-team-icon"}></span>{"나의 팀"}</li>
                    <li onClick={onTeamCreationBtnClickEventHandler}><span className={"icon group-add-icon"}></span>{"팀 생성"}</li>
                    <li><span className={"icon add-icon"}></span>{"TeamPL에 사용자 초대"}</li>
                    <li><span className={"icon search-icon"}></span>{"사용자 및 팀 검색"}</li>
                </ul>
            </div>
        )
    }

    const CurrentDetailComp = () => {
        return (
            <div className={"current-detail-wrapper"}>
                <div className={"current-detail-title"}>{"최근의 작업"}</div>
                <div className={"divider"}></div>
                <div className={"current-detail-content-box"}>
                    <div className={"current-detail-none-box"}>
                        <div className={"current-detail-none-img"}></div>
                        <div className={"current-detail-none-comment"}>{"최근 진행한 내역이 없습니다."}</div>
                    </div>
                </div>
            </div>
        )
    }

    const PersonalPrjDetailComp = () => {
        //* eventHandler :프로젝트 생성 버튼 클릭이 이벤트 헨들러
        //*팀생성 버튼에 대한 모달타입은 cp임
        const onCreateProjectBtnClickEventHandler = () => {
            onMenuBtnClickEventHandler("personal");
            setModalType("cp");
            setIsModalOpen(true);
        }
        return (
            <div id={"personal-detail-wrapper"}>
                <ul className={"personal-detail-menu"}>
                    <li onClick={onPrjBtnClickEventHandler}><span className={"icon more-list-icon"}></span>프로젝트
                        목록
                    </li>
                    <li onClick={onCreateProjectBtnClickEventHandler}><span className={"icon add-icon"}></span>프로젝트 생성
                    </li>
                    <li><span className={"icon personal-project-icon"}></span>프로젝트 이슈 관리</li>
                </ul>
            </div>
        )
    }

    return (
        <div id={"main-header-wrapper"}>
            {modalType === ModalType.PROJECT_LIST && (
                <ProjectModal/>
            )}
            <div className={"main-header-container"}>
                <div className={"main-header-content-box"}>
                    <div className={"main-header-content1"}>
                        <div className={"main-header-logo-content-box"}>
                            <div className={"main-header-logo tool-logo"}></div>
                            <div className={"main-header-tool-name"}>{"TeamPL"}</div>
                        </div>
                        <div className={"main-header-menu-box"}>
                            <ul className={"main-header-menu"}>
                                <li onClick={onHomeBtnClickEventHandler}>홈</li>
                                <li onClick={onCurrentBtnClickEventHandler}> 최근<span
                                    className={"icon arrow-down-icon"}></span></li>
                                <li onClick={onTeamBtnClickEventHandler}> 팀<span
                                    className={"icon arrow-down-icon"}></span></li>
                                <li onClick={onPersonalPrjBtnClickEventHandler}>개인 프로젝트 <span
                                    className={"icon arrow-down-icon"}></span></li>
                                <li>이슈 리포트</li>
                                <li>캘린더</li>
                            </ul>
                        </div>
                        {teamBtnClickState && (<div className={"main-header-menu-detail1"}><TeamDetailComp/></div>)}
                        {currentBtnClickState && (
                            <div className={"main-header-menu-detail2"}><CurrentDetailComp/></div>)}
                        {personalPrjBtnClickState && (
                            <div className={"main-header-menu-detail3"}><PersonalPrjDetailComp/></div>)}
                    </div>
                    <div className={"main-header-content2"}>
                        <div className={"main-header-individual-content-box"}>
                            <InitialsImg name={"jdj881204@naver.com"} height={36} width={36}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}