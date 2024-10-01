import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Container from "./layout/container";
import {AUTH_PATH} from "./constant";
import Authentication from "./view/Authentication";

function App() {
    return (
        <Routes>
            <Route element={<Container/>}>
                <Route path={AUTH_PATH()} element={<Authentication/>}/>
                <Route path={"/"} element={<Navigate to={"/auth"}/>}/> {/* 루트페이지에 대한 네비게이트 */}
            </Route>
        </Routes>
    );
}

export default App;
