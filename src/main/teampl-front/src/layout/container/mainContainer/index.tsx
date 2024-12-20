import "./style.css";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import MainHeader from "../../header/mainHeader";
import InitialsImg from "../../../component/InitialsImg";
import {AUTH_PATH, HOME_PATH, SIGN_IN_PATH} from "../../../constant/path";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {modalStore,headerMenuStore} from "../../../store";
import Index from "../../../component/modal/creationModal";
import {ModalType} from "../../../common";
import IssueModal from "../../../component/modal/issueModal/issueModal";


export default function MainContainer() {
    // location  :  path값을 가져오는 함수
    const {pathname} = useLocation();
    // navigate : 네비게이트 함수
    const navigator = useNavigate();
    // state : 쿠키상태
    const [cookies, setCookies] = useCookies();
    // const : 로딩상태
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // global State: 모달에 관련된 전역상태
    const {isModalOpen, modalType} = modalStore();
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

    //* eventHandler : 메인 컨테이너 클릭 이벤트헨들러 > 컨테이너를 클릭하면 상단 메뉴가 닫혀야 한다.
    const onMainContainerClickEventHandler = () => {
        if (teamBtnClickState || currentBtnClickState || personalPrjBtnClickState){
            setCurrentBtnClickState(false);
            setPersonalPrjBtnClickState(false);
            setTeamBtnClickState(false);
        }
    }


    interface ParticipantsProp {
        email: string,
        nickname: string,
        profileImg?: string,
        teamRole: number
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


    // 참여자 컴포넌트
    const ParticipantsCardItem = (props: ParticipantsProp) => {
        const {email, nickname, profileImg} = props;
        const {teamRole} = props;

        // function : 값에 따른 직급 얻어오기
        const getRole = (teamRole: number) => {
            const roles: { [roleNum: string]: string } = {
                "0": "팀장",
                "1": "팀원"
            }
            return roles[teamRole.toString()];
        }
        return (
            <div className={"participants-card-wrapper"}>
                {!profileImg ? <InitialsImg name={email} width={30} height={30}/> :
                    <div className={"participants-card-picture"}/>
                }

                <div className={"participants-card-info"}>
                    <div className={"participants-card-info-nickname"}>{nickname}</div>
                    <div className={"participants-card-info-email"}>{email}</div>
                </div>

                <div className={"participants-card-info-role"}>{getRole(teamRole)}</div>
            </div>
        )
    }
    if (pathname === `${HOME_PATH()}`) return null;
    if (!isLoading) return null;


    return (
        <>
            <MainHeader/>

            <div id={"main-wrapper"}>
                <div className={"main-container"} onClick={onMainContainerClickEventHandler}>
                    {isModalOpen && modalType === ModalType.CREATE_PROJECT && (
                        <Index title={"Create a Project"}
                               comment={"개인용 프로젝트를 생성합니다."}
                               nameLabel={"Project Name"}
                               nameToolTip={"이 프로젝트를 누가 보나요?"}
                               createBtnName={"프로젝트 생성"}
                               isTeamCreationModal={false}/>
                    )}
                    <div className={"main-left-container"}>
                        <Outlet/>
                    </div>
                    <div className={"main-right-container"}>
                        <div className={"main-right-participants-container"}>
                            <div className={"main-right-participants-title"}>{"팀 참여자"}</div>
                            <div className={"main-right-participants-divider"}></div>
                            <div className={"main-right-participants-body"}>
                                <ParticipantsCardItem email={"jdj881204@naver.cowewefewwem"} nickname={"동주"}
                                                      teamRole={1}/>
                            </div>
                        </div>
                        <div className={"main-right-etc-container"}>{"기타"}</div>
                    </div>
                </div>
            </div>
        </>
    )
}