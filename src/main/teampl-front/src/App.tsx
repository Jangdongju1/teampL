import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthContainer from "./layout/container/authContainer";
import {
    AUTH_PATH,
    AUTHENTICATION_CODE_CONFIRM_PATH,
    MAIN_PATH,
    PASSWORD_REGISTRATION_PATH,
    SIGN_IN_PATH
} from "./constant";
import Authentication from "./view/authentication";
import PasswordRegistration from "./view/authentication/passwordRegistration";
import ConfirmAuthCode from "./view/authentication/authenticationCodeConfirm";
import Home from "./view/home";
import MainContainer from "./layout/container/mainContainer";

function App() {
    return (
        <Routes>
            <Route element={<AuthContainer/>}>
                <Route path={"/"} element={<Navigate to={`${AUTH_PATH()}/${SIGN_IN_PATH()}`}/>}/>
                <Route path={AUTH_PATH()}>
                    <Route path={SIGN_IN_PATH()} element={<Authentication/>}/>
                    <Route path={AUTHENTICATION_CODE_CONFIRM_PATH(":email")} element={<ConfirmAuthCode/>}/>
                    <Route path={PASSWORD_REGISTRATION_PATH(":email")} element={<PasswordRegistration/>}/>
                </Route>
                {/*<Route path={MAIN_PATH(":email")} element={<Main/>}/>*/}
            </Route>

            <Route>
                <Route element={<MainContainer/>}>
                    <Route path={MAIN_PATH(":mail")} element={<Home/>}></Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
