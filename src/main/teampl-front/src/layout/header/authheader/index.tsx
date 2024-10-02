
import "./style.css";
//component : 로그인 화면 헤더
export default function AuthHeader(){

    return (
        <div className={"fixed-bar-container"}>
            <div className={"fixed-bar"}>
                <div className={"logo-container"}>
                    <div className={"logo tool-logo"}></div>
                    <div className={"tool-name"}>{"TeamPL"}</div>
                </div>
            </div>
        </div>
    )
}