import "./style.css";
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {AUTH_PATH, PASSWORD_REGISTRATION_PATH, SIGN_IN_PATH} from "../../../constant/path";
import {userEmailStore} from "../../../store";
import {AuthCodeConfirmRequest} from "../../../interface/request";
import {authCodeConfirmRequest} from "../../../api/authApi";
import {ResponseDto} from "../../../interface/response";
import AuthCodeConfirmResponse from "../../../interface/response/auth/authCodeConfirmResponse";
import ResponseCode from "../../../common/enum/responseCode";
import CryptoJS from "crypto-js/core";

export default function ConfirmAuthCode() {

    // navigate : 네비게이터
    const navigator = useNavigate();
    // state: 인증번호 input head 상태
    const [codeHeads, setCodeHeads] = useState<string[]>(Array(3).fill(''));
    // state: 인증번호 input body 상태
    const [codeBodies, setCodeBodies] = useState<string[]>(Array(3).fill(''));
    // state : 쿠키 상태
    const [cookie, setCookie] = useCookies();
    // global state : 유저 이메일 전역상태
    const {email, setEmail} = userEmailStore();
    // reference: 인증 코드 input head 및 body refer
    const headRefs = useRef<(HTMLInputElement | null)[]>([]);
    const bodyRefs = useRef<(HTMLInputElement | null)[]>([]);


    //eventHandler: 인증번호 input head 변경 이벤트처리 헨들러
    const onCodeInputHeadsChangeEventHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (/^[0-9]$/.test(value) || value === '') {  //  유효성 검사 숫자인 경우에만 업데이트
            // 배열의 얕은 복사
            const newCodeHeads = [...codeHeads];
            newCodeHeads[index] = value;
            setCodeHeads(newCodeHeads);
        }
    };

    const onCodeHeadsKeyDownEventHandler = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            // 현재 인풋이 비어있지 않은 경우
            if (codeHeads[index] === "") {
                // 이전 인풋으로 포커스 이동
                if (index > 0) {
                    headRefs.current[index - 1]?.focus();
                }
            }
        }

    }
    const onCodeBodiesKeyDownEventHandler = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key == "Backspace") {
            if (codeBodies[index] === "") {
                if (index > 0)
                    bodyRefs.current[index - 1]?.focus();
                else if (index == 0)
                    headRefs.current[codeHeads.length - 1]?.focus();
            }
        }
    }

    //eventHandler: 인증번호 input body 변경 이벤트처리 헨들러
    const onCodeInputBodiesChangeEventHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (/^[0-9]$/.test(value) || value === '') {
            //배열의 얕은 복사
            const newCodeBodies = [...codeBodies];
            newCodeBodies[index] = value;
            setCodeBodies(newCodeBodies);

        }

    }

    // eventHandler: 인증하기 버튼 클릭 이벤트 헨들러
    const onAuthenticationBtnClickEventHandler = () => {
        const code = [...codeHeads, ...codeBodies].join(""); // 두 배열에 있는 값을 묶고
        const requestBody : AuthCodeConfirmRequest = {code: code};
        const token : string = cookie.accessToken_Auth;
        if (!token){
            alert("유효하지 않은 페이지입니다.")
            navigator(`${AUTH_PATH()}/${SIGN_IN_PATH()}`);
            return;
        }
        authCodeConfirmRequest(requestBody,token).then(responseBody => authCodeConfirmResponse(responseBody));
    }



    // function : 인증번호 인증에 대한 응답처리함수
    const authCodeConfirmResponse = (responseBody : ResponseDto | AuthCodeConfirmResponse | null)=>{
        if (!responseBody) return;

        const {code} = responseBody as ResponseDto;
        if (code === ResponseCode.SUCCESS){

            const encodedEmail = btoa(email);
            navigator(`${AUTH_PATH()}/${PASSWORD_REGISTRATION_PATH(encodedEmail)}`);
        }
        else if(code === ResponseCode.AUTHENTICATION_FAILED) alert("유효하지 않은 코드입니다.");
        else if (code === ResponseCode.EXPIRE_AUTH_CODE) alert("만료된 코드입니다.");
    }

    // interface: 인풋 엘리먼트 전달 Prop
    interface CodeInputProp {
        value: string,
        onChange: (e: ChangeEvent<HTMLInputElement>) => void,
        onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    }


    const CodeInput =
        React.forwardRef<HTMLInputElement, CodeInputProp>((props: CodeInputProp, ref) => {
            const {value, onChange, onKeyDown} = props;
            return (
                <div>
                    <div id={"confirm-code-input-wrapper"}>
                        <input ref={ref} className={"code-confirm-code"} type={'text'} maxLength={1} value={value}
                               onChange={onChange}
                               onKeyDown={e => onKeyDown(e)}/>
                    </div>

                </div>
            )
        });

    useEffect(() => {
        if (!cookie.accessToken_Auth) navigator(`${AUTH_PATH()}/${SIGN_IN_PATH()}`);

        // 가장 먼저 빈 값을 가진 인덱스 찾기 만일 조건에 부합하지 않는경우 -1을반환
        const currentIndexCodeHeads = codeHeads.findIndex(code => code === "");
        const currentIndexCodeBodies = codeBodies.findIndex(code => code === "");
        // 빈 값이 있는 경우 해당 인덱스로 포커스 이동
        if (currentIndexCodeHeads > -1 && headRefs.current[currentIndexCodeHeads]) {

            const currentHeadEle = headRefs.current[currentIndexCodeHeads];
            if (currentHeadEle === null) return;
            currentHeadEle.focus();

        } else if (currentIndexCodeHeads === -1) {

            if (currentIndexCodeBodies > -1 && bodyRefs.current[currentIndexCodeBodies]) {
                const currentBodyEle = bodyRefs.current[currentIndexCodeBodies];
                if (currentBodyEle === null) return;
                currentBodyEle.focus();
            }
        }
    }, [codeHeads, codeBodies]);

    if (!cookie.accessToken_Auth) return null;

    return (
        <div id={"code-confirm-card-wrapper"}>
            <div className={"code-confirm-card-container"}>
                <div className={"code-confirm-top-container"}>

                    <div className={"code-confirm-top-logo-container"}>
                        <div className={"code-confirm-top-logo tool-logo"}></div>
                        <div className={"code-confirm-top-tool-name"}>{"TeamPL"}</div>
                    </div>

                    <div className={"code-confirm-top-comment-container"}>
                        <div className={"code-confirm-top-comment-title-container"}>
                            <div className={"code-confirm-top-comment-title"}>{"이메일 인증 코드 입력"}</div>
                        </div>


                        <div className={"code-confirm-top-comment-content-container"}>
                            <div className={"code-confirm-comment-content"}>{"" +
                                "이메일로 전송받은 인증코드를 입력하시고 확인 버튼을 클릭해 주세요."}</div>
                        </div>

                        <div className={"code-confirm-userEmail-container"}>
                            {email && (
                                <div className={"code-confirm-userEmail"}>{`E-mail : ${email}`}</div>
                            )}

                        </div>
                    </div>
                </div>


                <div className={"code-confirm-middle-container"}>
                    <div className={"code-confirm-code-container"}>
                        <div className={"code-confirm-code-head"}>

                            {codeHeads.map((item, index) =>
                                <CodeInput ref={el => (headRefs.current[index]) = el} key={index} value={item}
                                           onChange={e => onCodeInputHeadsChangeEventHandler(e, index)}
                                           onKeyDown={(e) => onCodeHeadsKeyDownEventHandler(e, index)}

                                />)}
                        </div>
                        <div className={"code-confirm-code-body"}>

                            {codeBodies.map((item, index) =>
                                <CodeInput ref={el => bodyRefs.current[index] = el} key={index} value={item}
                                           onChange={e => onCodeInputBodiesChangeEventHandler(e, index)}
                                           onKeyDown={e => onCodeBodiesKeyDownEventHandler(e, index)}
                                />)}

                        </div>
                    </div>
                </div>

                <div className={"code-confirm-bottom-container"}>
                    <div className={"code-confirm-bottom-comment-container"}>
                        <div className={"code-confirm-bottom-comment"}>{"인증 코드가 발송되지 않았을 경우 '재전송' 버튼을 클릭하세요."}</div>
                        <div className={"code-confirm-resend-code"}>{"인증 코드 재전송"}</div>
                    </div>

                    <div className={"code-confirm-button-container"}>
                        <div className={"code-confirm-button"} onClick={onAuthenticationBtnClickEventHandler}>{"인증하기"}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}