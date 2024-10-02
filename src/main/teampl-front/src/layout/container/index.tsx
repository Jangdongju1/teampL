//component: 컨테이너
import Header from "../header";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "../footer";
import {AUTH_PATH} from "../../constant";
import AuthHeader from "../header/authheader";


// component : 컨테이너 전체 화면구성의 레이아웃.
export default function Container() {
    // state : pathname 상태
    const {pathname} = useLocation();
    return (
        <>
            {pathname == AUTH_PATH() && (<AuthHeader/>)}
            <Outlet/>
            {pathname != AUTH_PATH() && (<Footer/>)}
        </>
    )
}