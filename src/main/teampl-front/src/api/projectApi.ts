import {CreateProjecRequest} from "../interface/request";
import axios from "axios";
import {CREATE_PERSONAL_PROJECT, GET_PERSONAL_PROJECT_INFO, GET_PROJECT_LIST} from "../constant/indicator";
import CreateProjectResponse from "../interface/response/project/createProjectResponse";
import {GetProjectListResponse, ResponseDto} from "../interface/response";
import GetPersonalPrjInfoResponse from "../interface/response/project/getPersonalPrjInfoResponse";

const DOMAIN = "http://localhost:4000";
const BASE_URL = "/api/v1/project"
const apiEndPoint = (indicator: string) => `${DOMAIN}${BASE_URL}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};

//* 개인 프로젝트 생성 api 호출
export const createProjectRequest = async (requestBody: CreateProjecRequest, accessToken: string) => {

    try {
        const result = await axios.post <CreateProjectResponse>(
            apiEndPoint(CREATE_PERSONAL_PROJECT()), requestBody, Authorization(accessToken));
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

//* 특정 개인프로젝트의 정보를 가져오는 api호출
export const getPersonalPrjInfoRequest = async (projectNum: string, accessToken: string) => {
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

// 프로젝트의 리스트를 가져오는 api
export const getProjectListRequest = async (accessToken: string) => {
    try {
        const result = await axios.get(apiEndPoint(GET_PROJECT_LIST()), Authorization(accessToken));
        const responseBody : GetProjectListResponse  = result.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)){
            if (!error.response){
                console.error("unexpected error", error.message);
                return null;
            }
            const responseBody : ResponseDto  = error.response.data;
            return responseBody
        }else {
            console.error("not axios error", error)
            return null;
        }


    }
}