import axios from "axios";
import {
    CREATE_PERSONAL_ISSUE_URL, GET_PERSONAL_ISSUE_BY_NUMBER_URL,
    GET_PERSONAL_ISSUE_BY_STATUS_URL,
    GET_PERSONAL_ISSUE_LIST_URL,
    PATCH_ISSUE_TITLE_URL
} from "../common/apiEndPoint";
import CreateIssueResponse from "../interface/response/issue/personal/createIssueResponse";
import {GetPersonalIssueByNumResponse, PatchIssueTitleResponse, ResponseDto} from "../interface/response";
import CreateIssueRequest from "../interface/request/issue/personal/createIssueRequest";
import GetPersonalIssueListResponse from "../interface/response/issue/personal/getPersonalIssueListResponse";
import {PatchIssueTitleRequest} from "../interface/request";
import {clearConfig} from "dompurify";

const DOMAIN = "http://localhost:4000";
const apiEndPoint = (domain: string, indicator: string) => `${domain}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};


export const createIssueRequest = async (requestBody: CreateIssueRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(DOMAIN, CREATE_PERSONAL_ISSUE_URL()), requestBody, Authorization(accessToken));
        const responseBody: CreateIssueResponse = result.data;

        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // axios error 의 경우
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;

            return responseBody;
        } else {
            console.log("unexpected Error", error);
            return null;
        }

    }
}

// 특정 프로젝트에 대한 이슈 리스트 가져오기
export const getPersonalIssueListRequest = async (projectNum: string, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(DOMAIN, GET_PERSONAL_ISSUE_LIST_URL(projectNum)), Authorization(accessToken));

        const responseBody: GetPersonalIssueListResponse = result.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.log("unexpected Error", error);
            return null;
        }
    }
}

//특정 issueNum에 대한 이슈 데이터가져오기
export const getPersonalIssueByIssueNum = async (issueNum:number , accessToken:string)=>{
    try {
        const result =
            await axios.get(apiEndPoint(DOMAIN,GET_PERSONAL_ISSUE_BY_NUMBER_URL(issueNum)), Authorization(accessToken));

        const responseBody : GetPersonalIssueByNumResponse = result.data;
        return responseBody;

    }catch (error){
        if (axios.isAxiosError(error)){
            if (!error.response) return null;
            const responseBody : ResponseDto  = error.response.data;
            return responseBody;
        }else{
            console.log("unexpected Error", error);
            return null;
        }
    }
}

// state 별 이슈 리스트 가져오기
// export const getPersonalIssueByStatus = async (projectNum: string, status: number, accessToken: string) => {
//     try {
//         const result =
//             await axios.get(apiEndPoint(DOMAIN, GET_PERSONAL_ISSUE_BY_STATUS_URL(projectNum, status)), Authorization(accessToken));
//
//         const responseBody: GetPersonalIssueListResponse = result.data;
//         return responseBody;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             if (!error.response) return null;
//             const responseBody: ResponseDto = error.response.data;
//             return responseBody;
//         } else {
//             console.log("unexpected Error", error);
//             return null;
//         }
//     }
// }
// 간단한 이슈 제목 수정요청
export const patchIssueTitleRequest = async (requestBody: PatchIssueTitleRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(DOMAIN, PATCH_ISSUE_TITLE_URL()), requestBody, Authorization(accessToken));
        const responseBody: PatchIssueTitleResponse = result.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)){
            if (!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        }else {
            console.log("unexpected Error", error);
            return null;
        }

    }
}