import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import AuthContainer from "./layout/container/authContainer";
import {
    AUTH_PATH,
    AUTHENTICATION_CODE_CONFIRM_PATH,
    HOME_PATH,
    PASSWORD_REGISTRATION_PATH, PERSONAL_PAGE_INVITATION, PERSONAL_PAGE_PATH,
    PERSONAL_PROJECT_BOARD_PATH,
    PERSONAL_PROJECT_HOME_PATH,
    SIGN_IN_PATH, TEAM_MAIN_PATH, TEAM_PATH, TEAM_PROJECT_BOARD_PATH, TEAM_PROJECT_PATH
} from "./constant/path";
import Authentication from "./view/authentication";
import PasswordRegistration from "./view/authentication/passwordRegistration";
import ConfirmAuthCode from "./view/authentication/authenticationCodeConfirm";
import MainContainer from "./layout/container/mainContainer";
import PersonalProject from "./view/personalPage/personalProject/personalProject";
import KanbanBoard from "./view/kanbanBoard/kanbanBoard";
import {useCookies} from "react-cookie";
import {LoginUserResponse, ResponseDto} from "./interface/response";
import ResponseCode from "./common/enum/responseCode";
import {modalStore, userEmailStore} from "./store";
import {isLoginUserRequest} from "./api/authApi";
import TeamPage from "./view/team/teamPage";
import TeamProject from "./view/team/teamProject/teamProject";
import InvitationInfo from "./view/personalPage/teamInfo/invitationInfo";

function App() {
    //navigator
    const navigator = useNavigate();
    //state : 쿠킥상태
    const [cookies, setCookies] = useCookies();
    // global State: 모달상태
    const {isModalOpen} = modalStore();
    //* global State: 로그인된 유저의 이메일 상태
    const {loginUserEmail,setLoginUserEmail} = userEmailStore();
    //function : 로그인된 유저인지 확인 후 응답처리 함수.
    const loginUserResponse = (responseBody : LoginUserResponse | ResponseDto | null) =>{
        if (!responseBody) return;
        const {code} = responseBody as ResponseDto;
        if (code  !== ResponseCode.SUCCESS) return;


        // 로그인된 유저의 아이디를 반환는 방식으로 수정이 필요함.
        const identifier = sessionStorage.getItem("identifier");



        if (!identifier) return;


        const userEmail = atob(identifier);
        setLoginUserEmail(userEmail);

    }

    // 로그한 유저인지 확인
    useEffect(() => {

        if (!cookies.accessToken_Main) {
            if (sessionStorage.getItem("identifier")) sessionStorage.removeItem("identifier");
        }
        isLoginUserRequest(cookies.accessToken_Main)
            .then(response => (loginUserResponse(response)));
        console.log("로그인유저 확인");

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
                        <Route path={PERSONAL_PROJECT_BOARD_PATH( ":email",":projectNum")} element={<KanbanBoard/>}/>


                        <Route path={TEAM_PATH()}>
                            <Route path={TEAM_MAIN_PATH(":email")} element={<TeamPage/>}/>
                            <Route path={TEAM_PROJECT_PATH(":email", ":regNum")} element={<TeamProject/>}/>
                            <Route path={TEAM_PROJECT_BOARD_PATH(":regNum", ":creator", ":projectNum")} element={<KanbanBoard/>}/>
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
