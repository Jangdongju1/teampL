import "./style.css";
import InputComponent from "../../inputCmponent/auth";
import React, {ChangeEvent, useState} from "react";
import CommonBtn from "../../btn";
import {modalStore} from "../../../store";

export default function PassModification() {
    //state : 현재 비밀번호 샹태
    const [currentPass, setCurrentPass] = useState<string>("");
    //state : 변경할 비밀번호 상태
    const [pass, setPass] = useState<string>("");
    //state : 비밀번호 확인상태
    const [passConfirm, setPassConfirm] = useState<string>("");
    //global state : 모달상태
    const {setModalType, setIsModalOpen} = modalStore();

    // state : 각 인풋의 에러상태 및 에러메세지 상태
    const [errors, setErrors] =
        useState<Record<string, { error: boolean, message: string }>>({
            currentPass: {error: false, message: ""},
            pass: {error: false, message: ""},
            passConfirm: {error: false, message: ""}
        })

    //eventHandler : 각각의 인풋에 대한 체인지 이벤트
    const onInputChangeEventHandler = (e: ChangeEvent<HTMLInputElement>,
                                       setter: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value;
        setter(value);
    }

    // eventHandler : 모달 닫기 버튼 클릭 이벤트 헨들러
    const onModalCloseBtnClickEventHandler = () => {
        setModalType("");
        setIsModalOpen(false);
    }

    // eventHandler : 비밀번호 변경버튼 클릭 이벤트 헨들러
    const onPassModificationBtnClickEventHandler = () => {

        // 현재 비밀번호 공백 체크
        if (currentPass.length === 0) {
            setErrors(prevState => ({
                ...prevState,
                currentPass: {error: true, message: "현재 비밀번호를 입력해주세요."}
            }));

            return;
        } else {
            setErrors(prevState => ({
                ...prevState,
                currentPass: {error: false, message: ""}
            }));
        }

        // 변경할 비밀번호 공백 체크
        if (pass.length === 0) {
            setErrors(prevState => ({
                ...prevState,
                pass: {error: true, message: "변경하실 비밀번호를 입력해 주세요."}
            }));

            return;
        } else {
            setErrors(prevState => ({
                ...prevState,
                pass: {error: false, message: ""}
            }));

        }

        // 영문, 숫자 , 특수문자를 반드시 포함 8~20자
        const regex = new RegExp("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[\\W_]).{8,12}$");

        if (!regex.test(pass)) {
            setErrors(prevState => ({
                ...prevState,
                pass: {error: true, message: "비밀번호가 정해진 형식에 맞지 안습니다."}
            }));
            return;
        } else {
            setErrors(prevState => ({
                ...prevState,
                pass: {error: false, message: ""}
            }));
        }

        // 비밀번호 확인란 일치 체크
        if (!(pass === passConfirm)) {
            setErrors(prevState => ({
                ...prevState,
                passConfirm: {error: true, message: "입력하신 비밀번호가 일치하지 않음"}
            }));

            return;
        }else {
            setErrors(prevState => ({
                ...prevState,
                passConfirm: {error: false, message: ""}
            }));

        }

        // 현재 비밀번호 일치여부 체크해야함.


        // 비밀번호 변경 api 호출



    }
    return (
        <div id={"pass-mod-wrapper"}>
            <div className={"pass-mod-top-container"}>
                <div className={"pass-mod-modal-title"}>{"비밀번호 변경"}</div>
                <div className={"icon pass-mod-modal-close close-icon"}
                     onClick={onModalCloseBtnClickEventHandler}></div>
            </div>

            <div className={"pass-mod-middle-container"}>
                <InputComponent type={"password"}
                                cssOption={{
                                    width: 428,
                                    height: 32,
                                    fontSize: 16
                                }}
                                label={"현재 비밀번호"}
                                emphasis={true}
                                value={currentPass}
                                onChange={e => onInputChangeEventHandler(e, setCurrentPass)}
                                error={errors.currentPass.error}
                                message={errors.currentPass.message}
                                description={"비밀번호를 잊으셨나요? "}
                                descriptionBtn={"비밀번호 재설정"}/>

                <InputComponent type={"password"}
                                cssOption={{
                                    width: 428,
                                    height: 32,
                                    fontSize: 16
                                }}
                                label={"변경할 비밀번호"}
                                emphasis={true}
                                value={pass}
                                onChange={e => onInputChangeEventHandler(e, setPass)}
                                error={errors.pass.error}
                                message={errors.pass.message}
                                description={"비밀번호 (영문자, 숫자, 특수문자 포함 최소 8~20자)"}/>

                <InputComponent type={"password"}
                                cssOption={{
                                    width: 428,
                                    height: 32,
                                    fontSize: 16
                                }}
                                label={"비밀번호 확인"}
                                emphasis={true}
                                value={passConfirm}
                                onChange={e => onInputChangeEventHandler(e, setPassConfirm)}
                                error={errors.passConfirm.error}
                                message={errors.passConfirm.message}/>
            </div>

            <div className={"pass-mod-bottom-container"}>
                <CommonBtn
                    style={
                        {
                            size: {width: 100, height: 46},
                            btnName: "취소",
                            backgroundColor: "rgba(251, 251, 253)",
                            hoverStyle: "background",
                            fontSize: 16,
                            fontColor: "rgba(0,0,0,1)",
                            border: "1px solid #d7e2eb",
                            etcStyle: "style-bold"
                        }
                    }
                    onClick={onModalCloseBtnClickEventHandler}/>
                <CommonBtn
                    style={
                        {
                            size: {width: 100, height: 46},
                            btnName: "저장",
                            backgroundColor: "#0C66E4",
                            hoverColor: "#0052CC",
                            hoverStyle: "background",
                            fontSize: 16,
                            fontColor: "rgba(255,255,255,1)",
                            etcStyle: "style-bold"
                        }
                    }
                    onClick={onPassModificationBtnClickEventHandler}/>

            </div>
        </div>
    )
}