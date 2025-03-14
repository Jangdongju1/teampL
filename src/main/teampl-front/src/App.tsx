import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import AuthContainer from "./layout/container/authContainer";
import {
    AUTH_PATH,
    AUTHENTICATION_CODE_CONFIRM_PATH,
    HOME_PATH, MY_PAGE_PATH,
    PASSWORD_REGISTRATION_PATH,
    PERSONAL_PAGE_INVITATION,
    PERSONAL_PAGE_PATH,
    PERSONAL_PROJECT_BOARD_PATH,
    PERSONAL_PROJECT_HOME_PATH,
    SIGN_IN_PATH,
    TEAM_MAIN_PATH,
    TEAM_PATH,
    TEAM_PROJECT_BOARD_PATH,
    TEAM_PROJECT_PATH
} from "./constant/path";
import Authentication from "./view/authentication/authentication";
import PasswordRegistration from "./view/authentication/authentication";
import ConfirmAuthCode from "./view/authentication/authenticationCodeConfirm/authenticationCodeConfirm";
import MainContainer from "./layout/container/mainContainer";
import PersonalProject from "./view/personalPage/personalProject/personalProject";
import KanbanBoard from "./view/kanbanBoard/kanbanBoard";
import {useCookies} from "react-cookie";
import {loginUserInfoStore, modalStore} from "./store";
import TeamPage from "./view/team/teamPage";
import TeamProject from "./view/team/teamProject/teamProject";
import InvitationInfo from "./view/personalPage/teamInfo/invitationInfo";
import {isLoginUserRequest} from "./api/authApi";
import {LoginUserResponse, ResponseDto} from "./interface/response";
import ResponseCode from "./common/enum/responseCode";
import MyPage from "./view/personalPage/myPage/myPage";

function App() {
    //navigator
    const navigator = useNavigate();
    //state : 쿠킥상태
    const [cookies, setCookies] = useCookies();
    // global State: 모달상태
    const {isModalOpen} = modalStore();
    // global State : 유저의 정보 상태
    const {info, setInfo} = loginUserInfoStore();

    // function : 로그인한 유저에 대한 정보 세팅
    const loginUserInfoSetting = (responseBody: LoginUserResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code != ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
        const {data} = responseBody as LoginUserResponse;
        const {email, nickname, profileImg} = data;

        // 상태 업데이트
        const updateState: Record<string, string> = {email, nickname, profileImg}
        setInfo(updateState);

    }

    // 로그한 유저인지 확인
    useEffect(() => {
        if (!cookies.accessToken_Main) {
            if (sessionStorage.getItem("identifier")) sessionStorage.removeItem("identifier");
            return;
        }
        // 새로고침 해서 없어지면 실행되어 유저의 정보를 세팅함.
        if (!info)
            isLoginUserRequest(cookies.accessToken_Main).then(response => loginUserInfoSetting(response))


    }, [cookies.accessToken_Main]);


    return (
        <div>
            <Routes>
                <Route element={<AuthContainer/>}>
                    <Route path={"/"} element={<Navigate to={`${AUTH_PATH()}/${SIGN_IN_PATH()}`}/>}/>
                    <Route path={AUTH_PATH()}>
                        <Route path={SIGN_IN_PATH()} element={<Authentication/>}/>
                        <Route path={AUTHENTICATION_CODE_CONFIRM_PATH(":email")} element={<ConfirmAuthCode/>}/>
                        <Route path={PASSWORD_REGISTRATION_PATH(":email")} element={<PasswordRegistration/>}/>
                    </Route>
                </Route>

                <Route element={<MainContainer/>}>
                    <Route path={HOME_PATH()}>
                        <Route path={PERSONAL_PROJECT_HOME_PATH(":email")} element={<PersonalProject/>}/>
                        <Route path={PERSONAL_PROJECT_BOARD_PATH(":email", ":projectNum")} element={<KanbanBoard/>}/>
                        <Route path={MY_PAGE_PATH(":email")} element={<MyPage/>}/>


                        <Route path={TEAM_PATH()}>
                            <Route path={TEAM_MAIN_PATH(":email")} element={<TeamPage/>}/>
                            <Route path={TEAM_PROJECT_PATH(":email", ":regNum")} element={<TeamProject/>}/>
                            <Route path={TEAM_PROJECT_BOARD_PATH(":regNum", ":creator", ":projectNum")}
                                   element={<KanbanBoard/>}/>
                        </Route>

                        <Route path={PERSONAL_PAGE_PATH()}>
                            <Route path={PERSONAL_PAGE_INVITATION(":email")} element={<InvitationInfo/>}/>
                        </Route>

                    </Route>


                </Route>
            </Routes>
        </div>

    );
}

export default App;
