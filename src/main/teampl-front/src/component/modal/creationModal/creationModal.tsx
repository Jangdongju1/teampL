import "./style.css"
import InputComponent from "../../inputCmponent/auth";
import {ChangeEvent, useState} from "react";
import {modalStore, projectStore, teamStore, userEmailStore} from "../../../store";
import {CreateProjectRequest, CreateTeamRequest} from "../../../interface/request";
import {useCookies} from "react-cookie";
import {createProjectRequest, createTeamProjectRequest} from "../../../api/projectApi";
import {CreateTeamResponse, ResponseDto} from "../../../interface/response";
import CreateProjectResponse from "../../../interface/response/project/createProjectResponse";
import ResponseCode from "../../../common/enum/responseCode";
import {ModalType} from "../../../common";
import {createTeamRequest} from "../../../api/teamApi";
import {Team} from "../../../interface/types";
import teamParamStore from "../../../store/teamParamStore";
import CreateTeamProjectRequest from "../../../interface/request/project/createTeamProjectRequest";
import CreateTeamProjectResponse from "../../../interface/response/project/createTeamProjectResponse";

type HeaderBtnModalProps = {
    title: string,  // 모달의 제목
    comment: string,  // 우측상단 모달 설명
    nameLabel: string, // 이름 input의 라벨
    nameToolTip: string,// 툴팁 멘트
    createBtnName: string, //생성 버튼 이름
    modalType: ModalType  // 팀생성 모달인지 여부
}
// 1) 팀 생성, 2)프로젝트 생성 3)팀프로젝트 생성 3곳에서 쓰일 모달창.
export default function CreationModal(props: HeaderBtnModalProps) {
    const {
        title,
        comment,
        nameLabel,
        nameToolTip,
        createBtnName,
        modalType
    } = props;
    // global State: 모달의 전역상태
    const {setIsModalOpen, setModalType} = modalStore();
    // global State: 팀상태
    const {teams, setTeams} = teamStore();
    // global State : 프로젝트 상태
    const {projects,setProjects} = projectStore();

    // state : 쿠키상태
    const [cookies, setCookies] = useCookies();
    const accessToken = cookies.accessToken_Main;
    // state : name 인풋 상태
    const [nameState, setNameState] = useState<string>("");
    // state : description 인풋 상태
    const [descriptionState, setDescriptionState] = useState<string>("");
    // global state 로그인 유저 이메일
    const {loginUserEmail} = userEmailStore();
    // global state : 팀프로젝트 생성을 위한 팀번호
    const {teamNumber} = teamParamStore();

    // 모달 타입에 따른 생성버튼 클릭시 이벤트 헨들러
    const eventHandler = () => {
        if (modalType === ModalType.CREATE_PROJECT)
            return onProjectCreateBtnClickEventHandler;
        if (modalType === ModalType.CREATE_TEAM)
            return onTeamCreateBtnClickEventHandler
        if (modalType === ModalType.CREATE_TEAM_PROJECT)
            return onTeamProjectCreateBtnClickEventHandler

        return () => {
        }
    }

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

    //function : 팀프로젝트 생성 응답처리함수
    const createTeamProjectResponse = (responseBody:CreateTeamProjectResponse | ResponseDto | null)=>{
        if (!responseBody) return;

        const {code,message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message)
            return;
        }
        // 상태 새팅



    }


    // function: 팀 생성 응답처리 함수
    const createTeamResponse = (responseBody: CreateTeamResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;
        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as CreateTeamResponse;
        // 상태 새팅

        const updateData: Team = {
            regNum: data.teamInfo.regNum,
            teamName: data.teamInfo.teamName,
            sequence: data.teamInfo.sequence,
            description: data.teamInfo.description,
            createDate: data.teamInfo.createDate,
            email: loginUserEmail,
            projects: 0,
            members: 1
        }
        const updateState = [updateData, ...teams]
        setTeams(updateState);

        alert("팀이 생성되었습니다")
        setModalType("");
        setIsModalOpen(false);
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
            // 갱신을 위한 상태 업데이트 필요
        }


    }
    // eventHandler : 생성하기 버튼 클릭 이벤트 헨들러 =>> project
    const onProjectCreateBtnClickEventHandler = async () => {
        if (!accessToken) return;
        const requestBody: CreateProjectRequest = {projectName: nameState, description: descriptionState};

        const responseBody = await createProjectRequest(requestBody, accessToken);

        await createProjectResponse(responseBody);
    }

    //eventHandler : 생성하기 버튼 클릭 이벤트 헨들러 >> team
    const onTeamCreateBtnClickEventHandler = async () => {
        if (!accessToken) {
            alert("AccessToken is expired!!")
            return;
        }
        const requestBody: CreateTeamRequest = {teamName: nameState, description: descriptionState};

        const responseBody = await createTeamRequest(requestBody, accessToken);

        createTeamResponse(responseBody);
    }

    // eventHandler = 생상하기 버튼 클릭 이벤트 헨들러 >> teamProject
    const onTeamProjectCreateBtnClickEventHandler = async () => {
        // 팀내의 프로젝트 생성은 팀의 생성인만 할 수 있도록 해야하나? 아니면 팀원 모두가 프로젝트를 생성할 수 있어야 하나?
        if (!teamNumber || !accessToken) return;
        const requestBody: CreateTeamProjectRequest = {
            projectName: nameState,
            description: descriptionState,
            regNum: teamNumber
        };

        const responseBody = await createTeamProjectRequest(requestBody, accessToken);

        createTeamProjectResponse(responseBody);

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
                             onClick={eventHandler()}>{createBtnName}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}