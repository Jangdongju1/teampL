import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
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

function App() {
    //state : 쿠킥상태
    const [cookies, setCookies] = useCookies();



    useEffect(() => {
        // 로그인된 유저인지 확인.
        if (!cookies.accessToken_Main) return;
        // 서버에 토큰 확인요청

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
