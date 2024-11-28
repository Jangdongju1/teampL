import axios from "axios";
import {
    CREATE_PERSONAL_ISSUE,
    GET_PERSONAL_ISSUE_BY_NUMBER,
    GET_PERSONAL_ISSUE_BY_STATUS,
    GET_PERSONAL_ISSUE_LIST, PATCH_CATEGORY, PATCH_EXPIRE_DATE, PATCH_ISSUE_PRIORITY, PATCH_ISSUE_STATUS,
    PATCH_ISSUE_TITLE
} from "../constant/indicator";
import {
    GetPersonalIssueByNumResponse,
    PatchIssueTitleResponse,
    ResponseDto,
    PatchIssuePriorityResponse,
    GetPersonalIssueListResponse,
    CreateIssueResponse,
    PatchIssueStatusResponse,
    PatchIssueCategoryResponse, PatchIssueExpireDateResponse
} from "../interface/response";
import {
    PatchIssueTitleRequest,
    PatchPriorityRequest,
    CreateIssueRequest,
    PatchIssueStatusRequest, PatchIssueCategoryRequest, PatchIssueExpireDateRequest
} from "../interface/request";


const DOMAIN = "http://localhost:4000";
const BASE_URL = "/api/v1/issue";
const apiEndPoint = (indicator: string) => `${DOMAIN}${BASE_URL}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};


export const createIssueRequest = async (requestBody: CreateIssueRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(CREATE_PERSONAL_ISSUE()), requestBody, Authorization(accessToken));
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
            await axios.get(apiEndPoint(GET_PERSONAL_ISSUE_LIST(projectNum)), Authorization(accessToken));

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
export const getPersonalIssueByIssueNum = async (issueNum: number, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_PERSONAL_ISSUE_BY_NUMBER(issueNum)), Authorization(accessToken));

        const responseBody: GetPersonalIssueByNumResponse = result.data;
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

// state 별 이슈 리스트 가져오기
export const getPersonalIssueByStatus = async (projectNum: string, status: number, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_PERSONAL_ISSUE_BY_STATUS(projectNum, status)), Authorization(accessToken));

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

// 간단한 이슈 제목 수정요청
export const patchIssueTitleRequest = async (requestBody: PatchIssueTitleRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_ISSUE_TITLE()), requestBody, Authorization(accessToken));
        const responseBody: PatchIssueTitleResponse = result.data;
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

// 이슈 priority 수정 요청

export const patchPriorityRequest = async (requestBody: PatchPriorityRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_ISSUE_PRIORITY()), requestBody, Authorization(accessToken));

        const responseBody: PatchIssuePriorityResponse = result.data;

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

// 이슈 status 수정 요청
export const patchStatusRequest = async (requestBody: PatchIssueStatusRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_ISSUE_STATUS()), requestBody, Authorization(accessToken));
        const responseBody: PatchIssueStatusResponse = result.data;
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

// 이슈에 대한 카테고리 수정요청
export const patchCategoryRequest = async (requestBody: PatchIssueCategoryRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_CATEGORY()), requestBody, Authorization(accessToken));

        const responseBody: PatchIssueCategoryResponse = result.data;
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

// 이슈 마감일자 수정 요청
export const patchExpireDateRequest = async (requestBody: PatchIssueExpireDateRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_EXPIRE_DATE()), requestBody, Authorization(accessToken));

        const responseBody : PatchIssueExpireDateResponse = result.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.log("unexpected Error!!", error);
            return null;
        }
    }

}
