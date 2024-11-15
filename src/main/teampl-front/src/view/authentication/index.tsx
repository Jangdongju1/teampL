import "./style.css";
import FlowChartDataListMock from "../../mock/flowChartDataList.mock";
import FlowChart from "../../component/flowChart/flowchart";
import FlowchartReverse from "../../component/flowChart/flowchart_reverse";
import InputComponent from "../../component/inputCmponent/auth";
import {ChangeEvent, useEffect, useState} from "react";
import ImageSlide from "../../component/imageSlide";
import {authCodeRequest, signInRequest} from "../../api/authApi";
import {AuthCodeRequest, SignInRequest} from "../../interface/request";
import {AuthCodeResponse, ResponseDto,SignInResponse} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import {useNavigate} from "react-router-dom";
import {
    AUTH_PATH,
    AUTHENTICATION_CODE_CONFIRM_PATH,
    HOME_PATH,
    PERSONAL_PROJECT_HOME_PATH,
    SIGN_IN_PATH
} from "../../constant/path";
import {useCookies} from "react-cookie";
import {userEmailStore} from "../../store";


// component : 로그인 관련 컴포넌트
export default function Authentication() {
    // Navigate : 네이게이션 함수
    const navigator = useNavigate();
    // state : 로그인 카드 상태
    const [logInCardState, setLogInCardState] = useState<boolean>(false);
    // state : 쿠기 상태
    const [cookie, setCookie] = useCookies();
    // state : 인증코드 페이지 식별자 상태

    // global state : 전역상태  유저의 이메일을 인증 코드 컴포넌트로 전달
    const {email, setEmail} = userEmailStore();


    // effect : 토큰 체크로직
    useEffect(() => {
        if (!cookie.accessToken_Auth) navigator(`${AUTH_PATH()}/${SIGN_IN_PATH()}`)
    }, [cookie]);


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

        // eventHandler : 회원가입 버튼 클릭 이벤트 헨들러
        const onSignUpBtnClickEventHandler = () => {
            if (!cookie.accessToken_Auth) setLogInCardState(!logInCardState);
            else {
                const encodedIndicator = sessionStorage.getItem("userEmail");
                if (!encodedIndicator) return;
                navigator(`${AUTH_PATH()}/${AUTHENTICATION_CODE_CONFIRM_PATH(encodedIndicator)}`);
            }

        }

        const signInResponse = (responseBody:SignInResponse | ResponseDto | null)=>{
            const {code,message} = responseBody as ResponseDto;
            if (code === ResponseCode.SUCCESS) {
                const {data} = responseBody as SignInResponse;
                const now = Date.now();

                const expires = new Date(now + data.expireTimeSec*1000);
                setCookie("accessToken_Main", data.token, {expires, path:`/`});

                const encodedUserEmail = btoa(userId)  // 이메일 인코딩.
                localStorage.setItem("identifier", encodedUserEmail); //로컬스토리지에 식별자 저장 .
                navigator(`${HOME_PATH()}/${PERSONAL_PROJECT_HOME_PATH(encodedUserEmail)}`)

            }
            else if (code === ResponseCode.SIGN_IN_FAILED) alert(message);
            else if (code === ResponseCode.NOT_EXIST_USER) alert(message);


        }
        // eventHandler: 로그인 버튼 클릭 이벤트 헨들러
        const onLogInBtnClickEventHandler = () => {
            const requestBody: SignInRequest = {email: userId, password: pass};
            signInRequest(requestBody)
                .then(responseBody => signInResponse(responseBody));

        }
        return (
            <div id={"sign-in-card-wrapper"}>
                <div className={"sign-in-top-container"}>

                    <div className={"sign-up-top-logo-container"}>
                        <div className={"sign-up-top-logo tool-logo"}></div>
                        <div className={"sign-up-top-tool-name"}>{"TeamPL"}</div>
                    </div>

                    <div className={"sign-up-top-comment-box1"}>{"계속하려면 로그인하세요."}</div>

                    <div className={"sign-in-top-input-container"}>
                        <InputComponent label={"업무용 이메일"} type={"text"} value={userId}
                                        onChange={onUserIdInputElementChangeEventHandler} error={idError}
                                        message={idErrorMessage}/>
                        <InputComponent label={"비밀번호"} type={type} value={pass}
                                        onChange={onPasswordInputElementChangeEventHandler} error={passError}
                                        icon={icon}
                                        onButtonClick={onPasswordInputElementIconClickEventHandler}
                                        message={passErrorMassage}/>
                    </div>
                    <div className={"sign-in-top-login-button-container"}>
                        <div className={"sign-in-top-login-button"} onClick={onLogInBtnClickEventHandler}>{"로그인"}</div>
                    </div>
                </div>

                <div className={"sign-in-bottom-container"}>

                    <div className={"sign-in-bottom-other-login-container"}>
                        <div className={"sign-in-bottom-other-login-divider"}/>
                        <div className={"other-comment"}>{"또는"}</div>
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
                            {"TeamPL을 처음으로 사용하시나요?"}&nbsp;&nbsp;<span
                            className={"emphasis cursor-pointer"} onClick={onSignUpBtnClickEventHandler}>{"회원가입"}</span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    const SignUPCard = () => {
        // state :  유저의 이메일 input 엘리먼트 상태
        const [userEmail, setUserEmail] = useState<string>("");
        // state :  유저 이메일 input 에러 상태
        const [userEmailError, setUserEmailError] = useState<boolean>(false);
        // state :  유저 이메일 input 에러 메세지 상태.(인증실패시 변경할 값)
        const [userEmailErrorMessage, setUserEmailErrorMessage] = useState<string>("");


        // eventHandler : 이메일입력 input 엘리먼트 변경 event Handler
        const onUserEmailInputElementChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setUserEmail(value);
        }
        // eventHandler : 로그인 버튼 클릭 이벤트 헨들러
        const onLogInBtnClickEventHandler = () => {
            setLogInCardState(!logInCardState);
        }

        // function : 회원가입 응답 처리함수.
        const signUpResponse = (responseBody: AuthCodeResponse | ResponseDto | null) => {
            if (!responseBody) return;
            const {code} = responseBody;

            if (code === ResponseCode.SUCCESS) alert("이메일을 보냈습니다.");
            else if (code === ResponseCode.EXIST_USER) {
                alert("이미 가입된 회원입니다.")
                navigator(`${AUTH_PATH()}/${SIGN_IN_PATH()}`);
                return;

            } else if (code === ResponseCode.ALREADY_SENT) return;  // 이미 이메일을 보낸 경우.

            const {data} = responseBody as AuthCodeResponse;
            const expires = new Date(new Date().getTime() + data.expireTimeSec * 1000);// 밀리세컨드 단위
            setCookie("accessToken_Auth", data.accessToken_Auth, {expires, path: `${AUTH_PATH()}/`});

            setEmail(data.email);  // 전역상태 저장.

            // 세션스토리지에 url식별자를 저장하고,  이메일로 인증페이지에 대한 url을 함께 전송할 예졍.
            const encodedEmail = btoa(data.email);
            sessionStorage.setItem("userEmail", encodedEmail);
            navigator(`${AUTH_PATH()}/${AUTHENTICATION_CODE_CONFIRM_PATH(encodedEmail)}`);

        }
        // eventHandler : 회원가입 버튼 클릭 이벤트 헨들러
        const onSignUpBtnClickEventHandler = () => {
            const requestBody: AuthCodeRequest = {email: userEmail};
            authCodeRequest(requestBody).then(response => signUpResponse(response));

        }

        return (
            <div id={"sign-in-card-wrapper"}>
                {/*top container*/}
                <div className={"sign-in-top-container"}>
                    <div className={"sign-up-top-logo-container"}>
                        <div className={"sign-up-top-logo tool-logo"}></div>
                        <div className={"sign-up-top-tool-name"}>{"TeamPL"}</div>
                    </div>
                    <div className={"sign-up-top-comment-box1"}>{"계속하려면 가입하세요."}</div>

                    <div className={"sign-up-top-input-box"}>
                        <InputComponent label={"이메일 입력"} type={"text"} value={userEmail}
                                        onChange={onUserEmailInputElementChangeEventHandler}
                                        error={userEmailError} message={userEmailErrorMessage}/>
                    </div>

                    <div className={"sign-up-top-comment-box2"}>
                        <div className={"sign-up-top-comment2"}>{"가입하면 TeamPL "}
                            <span className={"terms-and-conditions-emphasis cursor-pointer"}>{"이용 약관"}</span>
                            {"에 동의하고 개인정보 보호정책을 인정한 것으로 간주됩니다."}</div>
                    </div>

                    <div className={"sign-up-top-button-box"}>
                        <div className={"sign-up-button cursor-pointer"}
                             onClick={onSignUpBtnClickEventHandler}>{"회원가입"}</div>
                    </div>
                </div>

                {/*mid container*/}
                <div className={"sign-up-middle-container"}>
                    {/* divider*/}
                    <div className={"sign-up-bottom-other-container"}>
                        <div className={"sign-up-bottom-other-divider"}/>
                        <div className={"other-comment"}>{"또는"}</div>
                        <div className={"sign-up-bottom-other-divider"}/>
                    </div>

                    {/* social-signup-button*/}
                    <div className={"sign-up-middle-other-button-box"}>
                        <div className={"sign-up-middle-social-button"}>

                            <div className={"social-sign-up-button cursor-pointer"}>
                                <div className={"social-sign-up-button-content-box"}>
                                    <div className={"social-sign-up-icon google-icon"}></div>
                                    <div
                                        className={"social-sign-up-name social-sign-up-google-font-color"}>{"Signup with Google"}</div>
                                </div>
                            </div>

                            <div className={"social-sign-up-button cursor-pointer"}>
                                <div className={"social-sign-up-button-content-box"}>
                                    <div className={"social-sign-up-icon naver-icon"}></div>
                                    <div
                                        className={"social-sign-up-name social-sign-up-google-font-color"}>{"Signup with Naver"}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/*bottom container*/}
                <div className={"sign-up-bottom-container"}>
                    <div className={"sign-up-bottom-to-sign-in-card"}>
                        <div className={"sign-up-bottom-to-sign-in-card-comment"}>
                            {"이미 계정이 있으신가요?"}<span className={"terms-and-conditions-emphasis"}
                                                   onClick={onLogInBtnClickEventHandler}>{"로그인"}</span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div id={"auth-wrapper"}>
            <div className={"auth-top-container"}>
                <div className={'auth-top-contents-container'}>
                    <div className={"auth-top-sign-in-card "}>
                        {!logInCardState ? <SignInCard/> : <SignUPCard/>}
                    </div>
                    <div className={"auth-top-slide"}>
                        <ImageSlide/>
                    </div>
                </div>
            </div>

            <div className={"auth-middle-container"}>
                <div className={"auth-middle-advertising-comment-container"}>
                    <div
                        className={"auth-middle-advertising-comment"}>{"TeamPL로 보다 쉽게 이슈를 관리해 보세요. \n 업무의 능률이 향상됩니다."}</div>
                </div>
            </div>

            <div className={"auth-bottom-container"}>
                <div className={"auth-bottom-content-container"}>
                    {FlowChartDataListMock.map((item, index) =>
                        index % 2 === 0 ?
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