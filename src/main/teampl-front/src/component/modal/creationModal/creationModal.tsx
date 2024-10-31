import "./style.css"
import InputComponent from "../../inputCmponent";
import {ChangeEvent, useState} from "react";
import {modalStore, personalPrjStore} from "../../../store";
import {CreateProjectListRequest} from "../../../interface/request";
import {useCookies} from "react-cookie";
import {createProjectRequest, getPersonalPrjListRequest} from "../../../api/projectApi";
import {GetPersonalPrjListResponse, ResponseDto} from "../../../interface/response";
import CreateProjectResponse from "../../../interface/response/createProjectResponse";
import ResponseCode from "../../../common/responseCode";

type HeaderBtnModalProps = {
    title: string,  // 모달의 제목
    comment: string,  // 우측상단 모달 설명
    nameLabel: string, // 이름 input의 라벨
    nameToolTip: string,// 툴팁 멘트
    createBtnName: string, //생성 버튼 이름
    isTeamCreationModal: boolean  // 팀생성 모달인지 여부
}
// 1) 팀 생성, 2)프로젝트 생성 3)팀프로젝트 생성 3곳에서 쓰일 모달창.
export default function CreationModal(props: HeaderBtnModalProps) {
    const {
        title,
        comment,
        nameLabel,
        nameToolTip,
        createBtnName,
        isTeamCreationModal
    } = props;
    // global State: 모달의 전역상태
    const {setIsModalOpen, setModalType} = modalStore();
    // global State: 개인프로젝트 상태
    const {setProjects} = personalPrjStore();
    // state : 쿠키상태
    const [cookies, setCookies] = useCookies();

    // state : name 인풋 상태
    const [nameState, setNameState] = useState<string>("");
    // state : description 인풋 상태
    const [descriptionState, setDescriptionState] = useState<string>("");


    //eventHandler :  name상태 변경 이벤트 처리 헨들러
    const onNameInputStateChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length >= 50) return;
        setNameState(value);
    }
    //eventHandler :  description 상태 변경 이벤트 처리 헨들러
    const onDescriptionStateChangeEventHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length >= 50) return; // 50 글자 이상
        setDescriptionState(value);
    }
    //eventHandler : 모달창  닫기버튼 클릭 이벤트 헨들러
    const onCloseModalBtnClickEventHandler = () => {
        setIsModalOpen(false);
        setModalType("");
    }


    // function : 프로젝트 목록 가져오기 api 호출 응답 결과 처리함수.
    const getPersonalPrjResponse = (responseBody: ResponseDto | GetPersonalPrjListResponse | null)=>{
        if (!responseBody) return;
        const {code,message} = responseBody as ResponseDto;
        if (code != ResponseCode.SUCCESS) {
            alert(message);
            return
        }
        const {data} = responseBody as GetPersonalPrjListResponse;
        setProjects(data.list);
    }

    // function: 프로젝트 생성 응답처리함수
    const createProjectResponse = async (responseBody: ResponseDto | CreateProjectResponse | null) => {
        if (!responseBody) return

        const {code, message} = responseBody as ResponseDto;
        if (code != ResponseCode.SUCCESS) {
            alert(message);
            return;
        } else {
            alert("프로젝트가 생성되었습니다.");
            setIsModalOpen(false);
            //프로젝트 목록 가져오기 api호출
            const token = cookies.accessToken_Main;
            if (!token) return;

            const responseBody = await getPersonalPrjListRequest(token);
            getPersonalPrjResponse(responseBody);
        }


    }
    // eventHandler : 생성하기 버튼 클릭 이벤트 헨들러
    const onProjectCreateBtnClickEventHandler = async () => {
        const accessToken = cookies.accessToken_Main;
        if (!accessToken) return;
        const requestBody: CreateProjectListRequest = {projectName: nameState, description: descriptionState};

        const responseBody = await createProjectRequest(requestBody, accessToken);

        await createProjectResponse(responseBody);
    }

    const onTeamCreateBtnClickEventHandler = () => {

    }
    return (
        <div id={"creation-modal-wrapper"}>
            <div className={"creation-modal-title-box"}>
                <div className={"creation-modal-title"}>{title}</div>
            </div>

            <div className={"creation-modal-body"}>
                <div className={"creation-modal-body-picture-box"}>
                    <div className={"creation-modal-body-picture creation-picture"}></div>
                </div>

                <div className={"creation-modal-body-content-box"}>
                    <div className={"creation-modal-body-content-comment-box"}>
                        <div className={"creation-modal-body-content-comment"}>{comment}</div>
                    </div>

                    <div className={"creation-modal-body-content-name-input-box"}>
                        <div className={"creation-modal-input-label"}>
                            {nameLabel}
                            <span className={"creation-modal-input-label-essential-mark"}>{"*"}</span>
                        </div>
                        <InputComponent
                            type={"text"}
                            value={nameState}
                            onChange={onNameInputStateChangeEventHandler}
                            error={false}/>
                        <div className={"creation-modal-input-tool-tip-box"}>
                            <div className={"creation-modal-input-tool-tip"}>
                                {nameToolTip}
                                <span className={"icon creation-modal-input-tool-tip-icon tool-tip-icon"}/></div>
                        </div>
                    </div>

                    <div className={"creation-modal-body-content-description-input-box"}>
                        <div className={"creation-modal-body-content-description-label"}>
                            {"Description"}
                        </div>
                        <textarea className={"creation-modal-body-content-description-input"}
                                  value={descriptionState}
                                  onChange={onDescriptionStateChangeEventHandler}></textarea>
                    </div>

                    <div className={"creation-modal-bottom-btn-box"}>
                        <div className={"creation-modal-bottom-btn-cancel"}
                             onClick={onCloseModalBtnClickEventHandler}>{"취소"}</div>
                        <div className={"creation-modal-bottom-btn-creation"}
                             onClick={isTeamCreationModal ? onTeamCreateBtnClickEventHandler : onProjectCreateBtnClickEventHandler}>{createBtnName}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}