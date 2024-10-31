import {CreateProjectListRequest} from "../interface/request";
import axios from "axios";
import ApiEndPoint from "../common/ApiEndPoint";
import CreateProjectResponse from "../interface/response/createProjectResponse";
import {GetPersonalPrjListResponse, ResponseDto} from "../interface/response";
import GetPersonalPrjInfoRequest from "../interface/request/getPersonalPrjInfoRequest";
import GetPersonalPrjInfoResponse from "../interface/response/getPersonalPrjInfoResponse";

const DOMAIN = "http://localhost:4000";
const apiEndPoint = (domain: string, indicator: string) => `${domain}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};

//* 개인 프로젝트 생성 api 호출
export const createProjectRequest = async (requestBody: CreateProjectListRequest, accessToken: string) => {

    try {
        const result = await axios.post <CreateProjectResponse>(
            apiEndPoint(DOMAIN, ApiEndPoint.CREATE_PROJECT), requestBody, Authorization(accessToken));
        const responseBody: CreateProjectResponse = result.data;
        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            //isAxiosError  axios자체에서 발생하는 에러 처리 1) 응답코드 != 200, 2) 기타 axios관련 에러
            if (error.response === undefined) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.log("unexpected error", error);
            return null;
        }
    }
}

//* 개인프로젝트 목록 가져오기 api 호출
export const getPersonalPrjListRequest = async (accessToken: string) => {
    try {
        const result = await axios.get<GetPersonalPrjListResponse>(apiEndPoint(
            DOMAIN, ApiEndPoint.GET_PERSONAL_PROJECT_LIST), Authorization(accessToken));
        const responseBody: GetPersonalPrjListResponse = result.data;
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
export const getPersonalPrjInfoRequest = async (requestBody: GetPersonalPrjInfoRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(DOMAIN, ApiEndPoint.GET_PERSONAL_PROJECT_INFO), requestBody, Authorization(accessToken));

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