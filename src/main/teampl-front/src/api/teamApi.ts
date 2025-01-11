import {CREATE_TEAM, DOMAIN, GET_TEAM, GET_TEAM_MEMBER} from "../constant/indicator";
import {CreateTeamRequest} from "../interface/request";
import axios, {isAxiosError} from "axios";
import {CreateTeamResponse, GetTeamResponse, ResponseDto} from "../interface/response";
import GetTeamMemberResponse from "../interface/response/team/getTeamMemberResponse";

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

        const responseBody : GetTeamMemberResponse  = result.data;

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