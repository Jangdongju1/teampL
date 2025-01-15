import {
    CREATE_TEAM,
    DOMAIN,
    GET_TEAM,
    GET_TEAM_MEMBER,
    POST_INVITATION_TEAM_MEMBER,
    POST_REGISTRATION_MEMBER
} from "../constant/indicator";
import {CreateTeamRequest, InvitationMemberRequest, RegistrationMemberRequest} from "../interface/request";
import axios, {isAxiosError} from "axios";
import {CreateTeamResponse, GetTeamResponse, RegistrationMemberResponse, ResponseDto} from "../interface/response";
import GetTeamMemberResponse from "../interface/response/team/getTeamMemberResponse";
import InvitationMemberResponse from "../interface/response/team/invitationMemberResponse";

const BASE_URL = "/api/v1/team"
const apiEndPoint = (indicator: string) => `${DOMAIN}${BASE_URL}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};

export const createTeamRequest = async (requestBody: CreateTeamRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(CREATE_TEAM()), requestBody, Authorization(accessToken));
        const responseBody: CreateTeamResponse = result.data;
        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("unexpected axios error!!!!")
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error);
            return null;
        }
    }
}

// 팀 리스트를 가져오는 api
export const getTeamListRequest = async (accessToken: string) => {
    try {
        const result = await axios.get(apiEndPoint(GET_TEAM()), Authorization(accessToken));
        const responseBody: GetTeamResponse = result.data;
        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("unexpected axios error!!!!")
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error);
            return null;
        }
    }
}

// 특정팀의 팀원 정보를 가져오는 api
export const getTeamMemberListRequest = async (regNum: string, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_TEAM_MEMBER(regNum)), Authorization(accessToken));

        const responseBody: GetTeamMemberResponse = result.data;

        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("unexpected axios error!!")
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error);
            return null;
        }
    }
}

//팀원 초대 요청
export const invitationTeamMemberRequest = async (requestBody: InvitationMemberRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(POST_INVITATION_TEAM_MEMBER()), requestBody, Authorization(accessToken));

        const responseBody: InvitationMemberResponse = result.data;
        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("Unexpected Axios Error!!", error.message);
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error);
            return null;
        }
    }
}

// 팀원 등록 요청 (초대수락)
export const registrationMemberRequest = async (requestBody: RegistrationMemberRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(POST_REGISTRATION_MEMBER()), requestBody, Authorization(accessToken));

        const responseBody: RegistrationMemberResponse = result.data;
        return responseBody
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("Unexpected Axios Error!!", error.message);
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error);
            return null;
        }
    }
}