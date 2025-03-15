import "./style.css"
import {loginUserInfoStore, modalStore} from "../../../store";
import CommonBtn from "../../../component/btn";
import React, {ChangeEvent, useEffect, useState} from "react";
import InitialsImg from "../../../component/InitialsImg";
import {useParams} from "react-router-dom";
import InputComponent from "../../../component/inputCmponent/auth";
import {ModalType} from "../../../common";


export default function MyPage() {
    // global variable : user info
    const {info} = loginUserInfoStore();
    // path variable
    const {email} = useParams();
    // state : 각 수정사항에 대한 수정상태
    const [modification, setModification] = useState<boolean>(false);
    // state : 이메일상태
    const [nickname, setNickname] = useState<string>("");
    // global state : 모달상태
    const {setModalType, setIsModalOpen} = modalStore();



    // function : 유저 정보를 가져오는 함수
    const getUserInfo = (key: string) => {
        if (!info) return "";

        return info[key] ? info[key] : "";
    }

    // eventHandler : 기본정보 수정버튼 클릭 이벤트 헨들러
    const onCommonInfoModificationBtnClickEventHandler = () => {
        if (!email) return;
        if (getUserInfo("email") !== atob(email)) return;
        setModification(prevState => !prevState);
    }


    // eventHandler : input onChange
    const inputOnChangeEventHandler = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value;
        setter(value);
    }
    // eventHandler : 비밀번호 변경 버튼 클릭 이벤트 헨들러
    const onPassModificationBtnClickEventHandler = ()=>{
        setModalType(ModalType.PASS_MODIFICATION);
        setIsModalOpen(true);
    }

    // 마운트시 실행함수 : 닉네임 수정 input 에 현재 닉네임을 세팅함
    useEffect(() => {
        setNickname(getUserInfo("nickname"));  // 이거 나중에 수정해야함
    }, []);

    return (
        <div id={"my-page-wrapper"}>
            <div className={"my-page-container"}>
                <div className={"my-page-common-info-container"}>
                    <div className={"my-page-common-info-title"}>{"기본정보"}</div>
                    <div className={"my-page-common-info"}>
                        {getUserInfo("profileImg") ? <div className={"my-page-user-profile-image"}></div> :
                            <div className={"my-page-user-profile-container"}>
                                <InitialsImg name={getUserInfo("email")} width={124} height={124}/>
                                {modification && (<div className={"modification"}>
                                    <div className={"icon modification-image modification-icon"}></div>
                                </div>)}
                            </div>
                        }

                        {modification ? <div className={"my-page-common-info-modification"}>
                                <div className={"my-page-nickname-modification-container"}>
                                    <InputComponent type={"text"}
                                                    value={nickname}
                                                    onChange={e => inputOnChangeEventHandler(e, setNickname)}
                                                    error={false}
                                                    label={"닉네임"}/>

                                    <div className={"modification-btn-container"}>
                                        <CommonBtn
                                            style={
                                                {
                                                    size: {width: 100, height: 46},
                                                    btnName: "수정하기",
                                                    backgroundColor: "#0C66E4",
                                                    hoverColor: "#0052CC",
                                                    hoverStyle: "background",
                                                    fontSize: 16,
                                                    fontColor: "rgba(255,255,255,1)",
                                                    etcStyle: "style-bold"
                                                }
                                            }
                                            onClick={()=> console.log("닉네임 수정 api호출")}/>
                                    </div>


                                </div>

                            </div> :
                            <>
                                <div className={"my-page-user-nickname"}>{getUserInfo("nickname")}</div>
                                <div className={"my-page-user-email"}>{getUserInfo("email")}</div>
                            </>
                        }

                        <div className={"my-page-modification-btn"}>
                            <CommonBtn
                                style={
                                    {
                                        size: {width: 100, height: 46},
                                        btnName: modification? "수정완료" : "수정",
                                        backgroundColor: "#0C66E4",
                                        hoverColor: "#0052CC",
                                        hoverStyle: "background",
                                        fontSize: 16,
                                        fontColor: "rgba(255,255,255,1)",
                                        etcStyle: "style-bold"
                                    }
                                }
                                onClick={onCommonInfoModificationBtnClickEventHandler}/>

                        </div>


                    </div>
                </div>

                <div className={"my-page-pass-container"}>
                    <div className={"my-page-pass-title"}>{"비밀번호"}</div>
                    <div className={"my-page-pass"}>
                        <div className={"my-page-info-name"}>{"비밀번호"}</div>

                        <CommonBtn
                            style={
                                {
                                    size: {width: 130, height: 46},
                                    btnName: "비밀번호 변경",
                                    backgroundColor: "rgba(251, 251, 253)",
                                    hoverStyle: "background",
                                    fontSize: 16,
                                    fontColor: "rgba(0,0,0,1)",
                                    border:"1px solid #d7e2eb",
                                    etcStyle: "style-bold"
                                }
                            }
                            onClick={onPassModificationBtnClickEventHandler}/>
                    </div>
                </div>

            </div>
        </div>
    )
}