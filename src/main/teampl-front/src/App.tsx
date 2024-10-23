import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import AuthContainer from "./layout/container/authContainer";
import {
    AUTH_PATH,
    AUTHENTICATION_CODE_CONFIRM_PATH, HOME_PATH,
    PASSWORD_REGISTRATION_PATH,
    PERSONAL_PAGE_PATH, PERSONAL_PROJECT_BOARD_PATH,
    PERSONAL_PROJECT_HOME_PATH,
    SIGN_IN_PATH
} from "./constant";
import Authentication from "./view/authentication";
import PasswordRegistration from "./view/authentication/passwordRegistration";
import ConfirmAuthCode from "./view/authentication/authenticationCodeConfirm";
import Home from "./view/home";
import MainContainer from "./layout/container/mainContainer";
import PersonalProject from "./view/personalProject/personalProject";
import PersonalKanbanBoard from "./view/kanbanBoard/persnalKanbanBoard/personalKanbanBoard";
import {useCookies} from "react-cookie";
import {isLoginUserRequest} from "./api";
import {LoginUserResponse} from "./interface/response";
import {ResponseDto} from "./interface/response";
import ResponseCode from "./common/responseCode";

function App() {
    // navigator
    const navigator = useNavigate();
    //state : 쿠킥상태
    const [cookies, setCookies] = useCookies();
    //function : 로그인된 유저인지 확인 후 응답처리 함수.
    const loginUserResponse = (responseBody : LoginUserResponse | ResponseDto | null) =>{
        if (!responseBody) return;
        const {code} = responseBody as ResponseDto;
        if (code  !== ResponseCode.SUCCESS) return;
        const identifier = localStorage.getItem("identifier");

        if (!identifier) return;
        navigator(`${HOME_PATH()}/${PERSONAL_PROJECT_HOME_PATH(identifier)}`)
    }

    useEffect(() => {
        if (!cookies.accessToken_Main) {
            if (localStorage.getItem("identifier")) localStorage.removeItem("identifier");
        }
        isLoginUserRequest(cookies.accessToken_Main)
            .then(respsone => (loginUserResponse(respsone)));

    }, [cookies.accessToken_Main]);

    return (
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
                    <Route path={PERSONAL_PAGE_PATH(":email")} element={<Home/>}/>
                    <Route path={PERSONAL_PROJECT_HOME_PATH(":email")} element={<PersonalProject/>}/>
                    <Route path={PERSONAL_PROJECT_BOARD_PATH(":email", ":projectNum")}
                           element={<PersonalKanbanBoard/>}></Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
