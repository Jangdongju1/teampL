import "./style.css"
import {loginUserInfoStore, modalStore} from "../../../store";
import CommonBtn from "../../../component/btn";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import InitialsImg from "../../../component/InitialsImg";
import {useParams} from "react-router-dom";
import InputComponent from "../../../component/inputCmponent/auth";
import {ModalType} from "../../../common";
import {useCookies} from "react-cookie";
import {profileImgUploadRequest} from "../../../api/userApi";
import ProfileImgUploadResponse from "../../../interface/response/user/profileImgUploadResponse";
import {ResponseDto} from "../../../interface/response";
import ResponseCode from "../../../common/enum/responseCode";
import ProfileImgUrlResponse from "../../../interface/response/user/profileImgUrlResponse";
import * as url from "node:url";


export default function MyPage() {
    // global variable : user info
    const {info, setInfo} = loginUserInfoStore();
    // path variable
    const {email} = useParams();
    // state : 각 수정사항에 대한 수정상태
    const [modification, setModification] = useState<boolean>(false);
    // state : 이메일상태
    const [nickname, setNickname] = useState<string>("");
    // global state : 모달상태
    const {setModalType, setIsModalOpen} = modalStore();
    // useRef: 파일업로드 오브젝트의 접근을 위한 Ref
    const fileInputRef = useRef<HTMLInputElement>(null);


    // accessToken: 액세스 토큰 상태
    const [cookies] = useCookies();
    const accessToken = cookies.accessToken_Main;


    // function : 유저 정보를 가져오는 함수
    const getUserInfo = (key: string) => {
        if (!info) return "";

        return info[key] ? info[key] : "";
    }

    // function : 파일 업로드 요청에 대한 응답처리
    const fileUploadResponse = (responseBody: ProfileImgUploadResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as ProfileImgUploadResponse;

        const updateState = {
            ...info,
            profileImg: data.imageUrl
        };

        setInfo(updateState);  // 유저사진 상태 세팅
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
    const onPassModificationBtnClickEventHandler = () => {
        setModalType(ModalType.PASS_MODIFICATION);
        setIsModalOpen(true);
    }

    // eventHandler : 프로필 이미지 업로드 버튼 클릭 이벤트 헨들러
    const onProfileImgUploadBtnClickEventHandler = () => {
        const element = fileInputRef.current;
        if (!element) return;
        element.click();
    }

    // evenHandler : 파일 인풋 변경 이벤트 헨들러
    const onFileInputChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) return;

        // 인픗에서 파일을 여러개 선택할 수 있는 것은 어쩔 수 없으므로 그런 경우에 맨 마지막 파일을 업로드함.
        const files = e.target.files;
        const file = files[files.length - 1]; //두개 이상 선택 된 경우에 맨 마지막 요소를 넣음.

        const formData = new FormData();

        formData.append("profileImg", file);

        profileImgUploadRequest(formData, accessToken).then(response => fileUploadResponse(response));
    }


    // eventHandler : 닉네임 변경 벼튼 클릭 이벤트 헨들러
    const onNicknameChangeBtnClickEventHandler = () => {
        if (nickname.length === 0) {
            alert("닉네임을 입력해 주세요");
        }
        if (nickname === getUserInfo("nickname")) {
            alert("현재 닉네임과 같습니다.")
        }

        if (!accessToken) {
            alert("accessToken is expired");
            return;
        }


    }

    // 마운트시 실행함수 : 닉네임 수정 input 에 현재 닉네임을 세팅함
    useEffect(() => {
        setNickname(getUserInfo("nickname"));
    }, [info]);

    return (
        <div id={"my-page-wrapper"}>
            <div className={"my-page-container"}>
                <div className={"my-page-common-info-container"}>
                    <div className={"my-page-common-info-title"}>{"기본정보"}</div>

                    <div className={"my-page-common-info"}>
                        <div className={"my-page-user-profile-container"}>

                            {getUserInfo("profileImg") ? <div className={"my-page-user-profile-image"}
                                                              style={{
                                                                  background: `url(${info ? info.profileImg : ""})`
                                                              }}/> :
                                <InitialsImg name={getUserInfo("email")} width={124} height={124}/>}


                            {modification && (<div className={"modification"}>
                                    <div className={"icon modification-image modification-icon"}
                                         onClick={onProfileImgUploadBtnClickEventHandler}/>
                                </div>
                            )}
                            <input className={"profileImg-uploader"}
                                   ref={fileInputRef}
                                   type={"file"}
                                   accept={"image/png, image/jpg, image/jpeg"}
                                   onChange={onFileInputChangeEventHandler}/>
                        </div>


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
                                            onClick={onNicknameChangeBtnClickEventHandler}/>
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
                                        btnName: modification ? "수정완료" : "수정",
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
                                    border: "1px solid #d7e2eb",
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