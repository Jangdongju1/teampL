import "./style.css";
import FlowChartDataListMock from "../../mock/flowChartDataList.mock";
import FlowChart from "../../component/flowChart/flowchart";
import FlowchartReverse from "../../component/flowChart/flowchart_reverse";
import InputComponent from "../../component/inputCmponent";
import {ChangeEvent, useState} from "react";

// component : 로그인 관련 컴포넌트
export default function Authentication() {

    const SignInCard = () => {
        // state : 유저 아이디 상태
        const [userId, setUserId] = useState<string>("");
        // state : 유저 비밀번호 상태.
        const [pass, setPass] = useState<string>("");
        // state : 비밀번호 표시 아이콘 상태.
        const [icon, setIcon] =
            useState<"key-light-on-icon" | "key-light-off-icon">("key-light-off-icon");
        // state : 비밀번호 input 엘리먼트  type 상태
        const [type, setType] = useState<"text" | "password">("password");
        // state :   id error 상태
        const [idError, setIdError] = useState<boolean>(false);
        // state : id error message 상태
        const [idErrorMessage, setIdErrorMessage] = useState<string>("");
        // state : pass error 상태
        const [passError, setPassError] = useState<boolean>(false);
        // state : pass error message 상태
        const [passErrorMassage, setPassErrorMessage] = useState<string>("");



        // eventHandler : userId  input엘리먼트 체인지 이벤트 헨들러
        const onUserIdInputElementChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setUserId(value);
        }
        // eventHandler : password input엘리먼트 체인지 이벤트 헨들러
        const onPasswordInputElementChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setPass(value);
        }
        // eventHandler : 비밀번호 input 엘리먼트 버튼 클릭 이벤트 헨들러
        const onPasswordInputElementIconClickEventHandler = () => {
            if (type === "text") {
                setType("password");
                setIcon("key-light-off-icon");
            } else {
                setType("text");
                setIcon("key-light-on-icon");
            }
        }

        return (
            <div id={"sign-in-card-wrapper"}>
                <div className={"sign-in-top-container"}>

                    <div className={"sign-in-top-logo-container"}>
                        <div className={"sign-in-top-logo"}>{"TeamPL"}</div>
                    </div>

                    <div className={"sign-in-top-input-container"}>
                        <InputComponent label={"업무용 이메일"} type={"text"} value={userId}
                                        onChange={onUserIdInputElementChangeEventHandler} error={idError} message={idErrorMessage}/>
                        <InputComponent label={"비밀번호"} type={type} value={pass}
                                        onChange={onPasswordInputElementChangeEventHandler} error={passError} icon={icon}
                                        onButtonClick={onPasswordInputElementIconClickEventHandler} message={passErrorMassage}/>
                    </div>
                    <div className={"sign-in-top-login-button-container"}>
                        <div className={"sign-in-top-login-button"}>{"로그인"}</div>
                    </div>
                </div>

                <div className={"sign-in-bottom-container"}>

                    <div className={"sign-in-bottom-other-login-container"}>
                        <div className={"sign-in-bottom-other-login-divider"}/>
                        <div>{"또는"}</div>
                        <div className={"sign-in-bottom-other-login-divider"}/>
                    </div>

                    <div className={"sign-in-bottom-social-button-container"}>
                        <div className={"sign-in-bottom-social-button"}>
                            <div className={"icon-logo naver-icon"}></div>
                            <div className={"sign-in-bottom-social-button-description"}>{"Naver를 이용한 Login."}</div>
                        </div>

                        <div className={"sign-in-bottom-social-button"}>
                            <div className={"icon-logo google-icon"}></div>
                            <div className={"sign-in-bottom-social-button-description"}>{"Google를 이용한 Login"}</div>
                        </div>
                    </div>
                    <div className={"sign-in-bottom-other-login-divider2-container"}>
                        <div className={"sign-in-bottom-other-login-divider2"}></div>
                    </div>

                    <div className={"sign-in-bottom-etc"}>
                        <div className={"sign-in-bottom-etc-question-style"}>
                            {"비밀번호를 잊으셨나요?"}&nbsp;&nbsp;<span className={"emphasis cursor-pointer"}>{"비밀번호 찾기"}</span>
                        </div>

                        <div className={"sign-in-bottom-etc-question-style"}>
                            {"TeamPL을 처음으로 사용하시나요?"}&nbsp;&nbsp;<span className={"emphasis cursor-pointer"}>{"회원가입"}</span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id={"auth-wrapper"}>
            <div className={"auth-top-fixed-bar-container"}>
                <div className={"auth-top-fixed-bar"}>
                    <div className={"auth-top-logo-container"}>
                        <div className={"auth-top-logo"}></div>
                        <div className={"auth-top-tool-name"}>{"TeamPL"}</div>
                    </div>
                </div>
            </div>

            <div className={"auth-top-container"}>
                <div className={'auth-top-contents-container'}>
                    <div className={"auth-top-signIn-card "}>
                        <SignInCard/>
                    </div>
                    <div className={"auth-top-slide"}>{"슬라이드 컴포넌트"}</div>
                </div>
            </div>

            <div className={"auth-middle-container"}>
                <div className={"auth-middle-advertising-comment-container"}>
                    <div className={"auth-middle-advertising-comment"}>{"TeamPL로 보다 쉽게 이슈를 관리해 보세요. \n 업무의 능률이 향상됩니다."}</div>
                </div>
            </div>

            <div className={"auth-bottom-container"}>
                <div className={"auth-bottom-content-container"}>
                    {FlowChartDataListMock.map((item, index) =>
                        index % 2 == 0 ?
                            <FlowChart key={index} title={item.title} content={item.content}
                                       backgroundImg={item.backgroundImg}/> :
                            <FlowchartReverse key={index} title={item.title} content={item.content}
                                              backgroundImg={item.backgroundImg}/>
                    )}

                </div>
            </div>
        </div>
    )
}