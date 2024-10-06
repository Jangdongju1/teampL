import "./style.css";
import InputComponent from "../../../component/inputCmponent";
import {ChangeEvent, useState} from "react";

export default function PasswordRegistration() {
    // 패스워드 재등록 컴포넌트로 바꿀예정

    //state : 비밀번호 입력 상태.
    const [password, setPassword] = useState<string>("");
    //state : 비밀번호 input 타입 상태.
    const [passwordInputType, setPasswordInputType] = useState<"text" | "password">("password");
    //state : 패스워드 input 아이콘 상태
    const [passwordInputIcon, setPasswordInputIcon] = useState<"key-light-on-icon" | "key-light-off-icon">("key-light-off-icon");
    //state : 닉네임(아이디) 상태
    const [nickname, setNickname] = useState<string>("");


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