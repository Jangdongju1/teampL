import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Container from "./layout/container";
import {
    AUTH_PATH,
    PASSWORD_REGISTRATION_PATH,
    AUTHENTICATION_CODE_CONFIRM_PATH,
    SIGN_IN_PATH,
    MAIN_PATH
} from "./constant";
import Authentication from "./view/authentication";
import PasswordRegistration from "./view/authentication/passwordRegistration";
import ConfirmAuthCode from "./view/authentication/authenticationCodeConfirm";
import Main from "./view/main";

function App() {
    return (
        <Routes>
            <Route element={<Container/>}>
                <Route path={"/"} element={<Navigate to={`${AUTH_PATH()}/${SIGN_IN_PATH()}`}/>}/>
                <Route path={AUTH_PATH()}>
                    <Route path={SIGN_IN_PATH()} element={<Authentication/>}/>
                    <Route path={AUTHENTICATION_CODE_CONFIRM_PATH(":email")} element={<ConfirmAuthCode/>}/>
                    <Route path={PASSWORD_REGISTRATION_PATH(":email")} element={<PasswordRegistration/>}/>
                </Route>
                <Route path={MAIN_PATH(":email")} element={<Main/>}/>
            </Route>
        </Routes>
    );
}

export default App;
