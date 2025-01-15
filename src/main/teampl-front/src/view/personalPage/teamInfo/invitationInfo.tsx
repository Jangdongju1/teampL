import "./style.css";
import CommonInputComponent from "../../../component/inputCmponent/common";
import React, {useEffect, useState} from "react";
import invitationMock from "../../../mock/invitatoinList";
import InitialsImg from "../../../component/InitialsImg";
import CommonBtn from "../../../component/btn";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {getInvitationListRequest} from "../../../api/userApi";
import {GetInvitationListResponse, ResponseDto} from "../../../interface/response";
import ResponseCode from "../../../common/enum/responseCode";
import {Invitation} from "../../../interface/types";
import {userEmailStore} from "../../../store";


export default function InvitationInfo() {
    // 상단 검색어 입력상태
    const [searchWord, setSearchWord] = useState<string>("");
    // 초대목록 데이터 상태
    const [invitationList, setInvitationList] = useState<Invitation[]>([])
    // 하단 목록 : 배열
    const titles = ["이메일", "팀명", "초대일시", "수락"]
    // path variable
    const {email} = useParams();
    // 쿠키 및 accessToken
    const [cookies, setCookies] = useCookies();
    const accessToken  = cookies.accessToken_Main;

    // 로그인 유저의 상태
    const {loginUserEmail} = userEmailStore();

    //Mock
    const invitationData = invitationMock

    // function : 초대요청 리스트 api응답처리함수
    const getInvitationListResponse = (responseBody : GetInvitationListResponse | ResponseDto | null)=>{
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS){
            alert(message);
            return;
        }

        const {data} = responseBody as GetInvitationListResponse;

        setInvitationList(data.list);


    }


    // 마운트시 실행할 함수
    useEffect(() => {
        if (!accessToken || !email) return;
        const fetchInvitationList = async ()=>{
            const userEmail = atob(email); // 디코딩
            const responseBody = await getInvitationListRequest(userEmail, accessToken)
            getInvitationListResponse(responseBody);
        }

    }, [email]);

    //if (!email || email !== btoa(loginUserEmail) ) return null;
    return (
        <div id={"invitation-info-wrapper"}>
            <div className={"invitation-info-container"}>

                <div className={"invitation-title-box"}>
                    <div className={"invitation-title"}>{"초대요청"}</div>
                </div>

                <div className={"invitation-info-top-container"}>

                    <div className={"invitation-input-box"}>
                        <div className={"invitation-input-wrapper"}>
                            <span className={"invitation-input-label"}>{"초대한 사람"}</span>
                            <div className={"invitation-input-outline"}>
                                <CommonInputComponent value={searchWord} setValue={setSearchWord}/>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={"invitation-info-bottom-container"}>
                    <div className={"invitation-list-titles"}>
                        {titles.map((item, index) =>
                            <div className={"invitation-list-title"}>{item}</div>)}
                    </div>

                    <div className={"invitation-list-items"}>
                        {invitationData.map((item, index) =>
                            <div className={"invitation-item-wrapper"}>
                                <div className={"invitation-list-item"}>
                                    {item.profileImg ? <div className={"invitation-list-profile-image"}></div> :
                                        <span className={"invitation-list-initial-image"}>
                                        <InitialsImg name={"jdj881204@naver.com"}
                                                     width={26} height={26}/>
                                    </span>
                                    }

                                    {item.email}
                                </div>
                                <div className={"invitation-list-item"}>{item.teamName}</div>
                                <div className={"invitation-list-item"}>{item.invitationDate}</div>
                                <div className={"invitation-list-item"}>
                                    <CommonBtn
                                        style={
                                            {
                                                size: {width: 120, height: 32},
                                                btnName: "요청수락",
                                                backgroundColor: "#0C66E4",
                                                hoverColor: "#0052CC",
                                                hoverStyle: "background",
                                                fontSize: 16,
                                                fontColor: "rgba(255,255,255,1)"
                                            }
                                        }
                                        onClick={() => console.log("초대수락")}/>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    )
}