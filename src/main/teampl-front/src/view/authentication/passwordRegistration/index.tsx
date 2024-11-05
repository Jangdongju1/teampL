import "./style.css";
import InputComponent from "../../../component/inputCmponent/auth";
import {ChangeEvent, useEffect, useState} from "react";
import {userEmailStore} from "../../../store";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {AUTH_PATH, SIGN_IN_PATH} from "../../../constant";
import {SignUpRequest} from "../../../interface/request";
import {signUpRequest} from "../../../api/authApi";
import {ResponseDto, SignUpResponse} from "../../../interface/response";
import ResponseCode from "../../../common/enum/responseCode";

export default function PasswordRegistration() {
    // navigator
    const navigator = useNavigate();

    //state : 비밀번호 입력 상태.
    const [password, setPassword] = useState<string>("");
    //state : 비밀번호 input 타입 상태.
    const [passwordInputType, setPasswordInputType] = useState<"text" | "password">("password");
    //state : 패스워드 input 아이콘 상태
    const [passwordInputIcon, setPasswordInputIcon] = useState<"key-light-on-icon" | "key-light-off-icon">("key-light-off-icon");
    //state : 닉네임(아이디) 상태
    const [nickname, setNickname] = useState<string>("");
    // GlobalState: 유저이메일 전역상태
    const {email,setEmail} = userEmailStore();
    // state : 쿠킥 상태
    const [cookie , setCookie] = useCookies();

    //eventHandler : 비밀번호 input 엘리먼드 변경 이벤트 처리 헨들러
    const onPasswordInputElementChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
    }
    //eventHandler : 비밀번호 input아이콘 클릭 이벤트 헨들러
    const onPasswordInputElementIconClickEventHandler = () => {
        if (passwordInputType === "password") {
            setPasswordInputType("text");
            setPasswordInputIcon("key-light-on-icon");
        } else if (passwordInputType == "text") {
            setPasswordInputType("password");
            setPasswordInputIcon("key-light-off-icon");
        }
    }
    //eventHandler: 닉네임 InputElement 변경 이벤트 헨들러
    const onNicknameInputElementChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNickname(value);
    }
    //eventHandler: 회원가입 버튼 클릭 이베트 헨들러
    const onSignUpBtnClickEventHandler = () =>{
        const accessToken_Auth = cookie.accessToken_Auth;
        if (!accessToken_Auth) return;
        const requestBody:SignUpRequest = {password: password, nickname: nickname};// 객체화시켜서
        signUpRequest(requestBody,accessToken_Auth)
            .then(requestBody => signUpResponse(requestBody))

    }

    // function : 회원가입 응답결과 처리함수

    const signUpResponse = (responseBody:SignUpResponse | ResponseDto | null)=>{
        if (!responseBody) return;
        const {code} = responseBody as ResponseDto;

        if (code === ResponseCode.INITIAL_SERVER_ERROR) return;
        else if(code === ResponseCode.SUCCESS){
            const {data}  = responseBody as SignUpResponse;
            const cookieExpireTime = new Date(new Date().getTime() + data.expireTimeSec * 1000);
            setCookie("accessToken_Main", data.accessToken_Main, {expires:cookieExpireTime, path:`/`})  //메인 페스만 유효한 것으로수정
            // 메인페이지로 네비게이트
        }
    }
    useEffect(() => {
        if (!cookie.accessToken_Auth) navigator(`${AUTH_PATH()}/${SIGN_IN_PATH()}`);
    }, [cookie]);
    if (!cookie.accessToken_Auth) return null;  // 쿠키가 없으면 화면 출력 x

    return (
        <div id={"password-reg-wrapper"}>
            <div className={"password-reg-container"}>
                <div className={"password-reg-card"}>

                    <div className={"password-reg-top-container"}>
                        <div className={"password-reg-top-logo-container"}>
                            <div className={"password-reg-top-tool-logo tool-logo"}></div>
                            <div className={"password-reg-top-tool-name"}>{"TeamPL"}</div>
                        </div>
                        <div className={"password-registration-comment"}>
                            {"비밀번호 및 이름(닉네임)을 설정하고 시작하세요."}
                        </div>
                    </div>

                    <div className={"password-reg-middle-container"}>
                        <div className={"password-reg-input-container"}>
                            <InputComponent label={"비밀번호"}
                                            type={passwordInputType}
                                            value={password}
                                            onChange={onPasswordInputElementChangeEventHandler}
                                            onButtonClick={onPasswordInputElementIconClickEventHandler}
                                            error={false}
                                            icon={passwordInputIcon}/>

                            <InputComponent label={"닉네임"}
                                            type={"text"}
                                            value={nickname}
                                            onChange={onNicknameInputElementChangeEventHandler}
                                            error={false}/>
                        </div>
                    </div>

                    <div className={"bottom-container"}>
                        <div className={"password-reg-button-container"}>
                            <div className={"password-reg-sign-up-button"}>{"가입하기"}</div>
                        </div>

                        <div className={"password-reg-etc-comment-container"}>
                            <div className={"password-reg-bottom-divider"}></div>
                            <div className={"etc-comment"}>
                                {"회원 가입시 TeamPL 이용 약관에 동의한 것으로 간주합니다.   "}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}