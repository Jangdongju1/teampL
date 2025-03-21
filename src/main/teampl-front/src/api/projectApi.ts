import {CreateProjectRequest} from "../interface/request";
import axios from "axios";
import {
    CREATE_PERSONAL_PROJECT,
    CREATE_TEAM_PROJECT,
    DOMAIN,
    GET_PERSONAL_PROJECT_INFO, GET_PERSONAL_PROJECT_LIST,
    GET_PROJECT_LIST, GET_TEAM_PROJECT_LIST
} from "../constant/indicator";
import CreateProjectResponse from "../interface/response/project/createProjectResponse";
import {GetPrjListResponse, ResponseDto} from "../interface/response";
import GetPersonalPrjInfoResponse from "../interface/response/project/getPersonalPrjInfoResponse";
import CreateTeamProjectRequest from "../interface/request/project/createTeamProjectRequest";
import CreateTeamProjectResponse from "../interface/response/project/createTeamProjectResponse";
import GetTeamProjectListResponse from "../interface/response/project/getTeamProjectListResponse";

const BASE_URL = "/api/v1/project"
const apiEndPoint = (indicator: string) => `${DOMAIN}${BASE_URL}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};

//* 개인 프로젝트 생성 api 호출
export const createProjectRequest = async (requestBody: CreateProjectRequest, accessToken: string) => {

    try {
        const result = await axios.post <CreateProjectResponse>(
            apiEndPoint(CREATE_PERSONAL_PROJECT()), requestBody, Authorization(accessToken));
        const responseBody: CreateProjectResponse = result.data;
        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            //isAxiosError  axios자체에서 발생하는 에러 처리 1) 응답코드 != 200, 2) 기타 axios관련 에러
            if (error.response === undefined) {
                console.log(error.message);
                return null
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error);
            return null;
        }
    }
}
// 팀프로젝트 생성 요청
export const createTeamProjectRequest = async (requestBody: CreateTeamProjectRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(CREATE_TEAM_PROJECT()), requestBody, Authorization(accessToken))

        const responseBody: CreateTeamProjectResponse = result.data;

        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.error("unexpected error", error.message);
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody
        } else {
            console.error("not axios error", error)
            return null;
        }

    }
}

// 서버단의 페이지네이션이 적용된 프로젝트 리스트 요청 (말그대로 전체임  개인 + 팀프로젝트)
export const getPrjListRequest = async (accessToken: string) => {
    try {
        const result = await axios.get(apiEndPoint(GET_PROJECT_LIST()), Authorization(accessToken));
        const responseBody: GetPrjListResponse = result.data;

        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log(error.message);
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error)
            return null;

        }
    }
}

export const getPersonalPrjListRequest = async (accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_PERSONAL_PROJECT_LIST()), Authorization(accessToken));
        const responseBody: GetPrjListResponse = result.data;

        return responseBody
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log(error.message);
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error)
            return null;

        }
    }
}

export const getTeamProjectListRequest = async (regNum: string, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_TEAM_PROJECT_LIST(regNum)), Authorization(accessToken));

        const responseBody: GetTeamProjectListResponse = result.data;
        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.log("unexpected error", error);
            return null;
        }
    }
}

//* 특정 개인프로젝트의 정보를 가져오는 api호출
export const getPrjInfoRequest = async (projectNum: string, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_PERSONAL_PROJECT_INFO(projectNum)), Authorization(accessToken));

        const responseBody: GetPersonalPrjInfoResponse = result.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.log("unexpected error", error);
            return null;
        }
    }
}
