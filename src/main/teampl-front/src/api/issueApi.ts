import axios from "axios";
import {
    CREATE_PERSONAL_ISSUE,
    DOMAIN,
    GET_ISSUE_COMMENT_LIST,
    GET_PERSONAL_ISSUE_BY_NUMBER,
    GET_PERSONAL_ISSUE_BY_STATUS,
    GET_PERSONAL_ISSUE_LIST,
    GET_TOTAL_COMMENT_COUNT,
    PATCH_DRAG_ISSUE_STATUS,
    PATCH_ISSUE_CATEGORY,
    PATCH_ISSUE_COMMENT,
    PATCH_ISSUE_DETAIL,
    PATCH_ISSUE_EXPIRE_DATE,
    PATCH_ISSUE_PRIORITY,
    PATCH_ISSUE_STATUS,
    PATCH_ISSUE_TITLE,
    POST_ISSUE_COMMENT
} from "../constant/indicator";
import {
    CreateIssueResponse,
    GetCommentCountResponse,
    GetPersonalIssueByNumResponse,
    GetPersonalIssueListResponse,
    PatchIssueCategoryResponse,
    PatchIssueCommentResponse,
    PatchIssueExpireDateResponse,
    PatchIssuePriorityResponse,
    PatchIssueStatusResponse,
    PatchIssueTitleResponse,
    PostIssueCommentResponse,
    ResponseDto
} from "../interface/response";
import {
    CreateIssueRequest,
    PatchIssueCategoryRequest,
    PatchIssueCommentRequest,
    PatchIssueDetailRequest,
    PatchIssueExpireDateRequest,
    PatchIssueStatusDragRequest,
    PatchIssueStatusRequest,
    PatchIssueTitleRequest,
    PatchPriorityRequest,
    PostIssueCommentRequest
} from "../interface/request";
import PatchIssueDetailResponse from "../interface/response/issue/patchIssueDetailResponse";
import GetIssueCommentListRequest from "../interface/request/issue/GetIssueCommentListRequest";
import PatchIssueStatusDragResponse from "../interface/response/issue/patchIssueStatusDragResponse";


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
export const getIssueListRequest = async (projectNum: string, accessToken: string) => {
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
            await axios.patch(apiEndPoint(PATCH_ISSUE_CATEGORY()), requestBody, Authorization(accessToken));

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
            await axios.patch(apiEndPoint(PATCH_ISSUE_EXPIRE_DATE()), requestBody, Authorization(accessToken));

        const responseBody: PatchIssueExpireDateResponse = result.data;
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

// 이슈 디테일 수정 요청
export const patchIssueDetailRequest = async (requestBody: PatchIssueDetailRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_ISSUE_DETAIL()), requestBody, Authorization(accessToken));

        const responseBody: PatchIssueDetailResponse = result.data;

        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.log("unexpected Error!!");
            return null;
        }
    }
}

// 이슈에 대한 comment 등록 요청
export const postIssueCommentRequest = async (requestBody: PostIssueCommentRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(POST_ISSUE_COMMENT()), requestBody, Authorization(accessToken));

        const responseBody: PostIssueCommentResponse = result.data;

        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.log("Unexpected Error!!");
            return null;
        }
    }
}

// 특정 이슈에 대한 comment 리스트를 가져오는 요청.
export const getIssueCommentListRequest = async (requestParam:GetIssueCommentListRequest, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_ISSUE_COMMENT_LIST(requestParam.issueNum,requestParam.page,requestParam.perPage)), Authorization(accessToken));

        const responseBody: GetPersonalIssueListResponse = result.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("Request", error.request);
                console.error("Error is occurred!", error.message)
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;

        } else {
            console.log("Unexpected Error!!");
            return null;
        }
    }
}

// 작성된 이슈의 수정

export const patchIssueCommentRequest = async (requestBody: PatchIssueCommentRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_ISSUE_COMMENT()), requestBody, Authorization(accessToken));

        const responseBody: PatchIssueCommentResponse = result.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("Request", error.request);
                console.error("Error is occurred!", error.message)
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.log("Unexpected Error!!", error);
            return null;
        }
    }
}

// 페이지네이션 구성을 위한 전체 코멘트의 카운트를 가져옴
export const getTotalCommentCountRequest = async (issueNum: number, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_TOTAL_COMMENT_COUNT(issueNum)), Authorization(accessToken));

        const responseBody: GetCommentCountResponse = result.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("Request", error.request);
                console.error("Error is occurred!", error.message)
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error("Unexpected Error!!", error);
            return null;
        }
    }
}

// 이슈 카드 드래그로 인한 status 변경요청.
export const patchDragIssueStatusRequest = async (requestBody : PatchIssueStatusDragRequest, accessToken:string)=>{
    try {
        const result =
           await axios.patch(apiEndPoint(PATCH_DRAG_ISSUE_STATUS()), requestBody, Authorization(accessToken));

        const responseBody : PatchIssueStatusDragResponse = result.data;
        return responseBody

    }catch (error){
        if (axios.isAxiosError(error)){
            if (!error.response){
                console.log("Request", error.request);
                console.error("Error is occurred!", error.message)
                return null;
            }
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        }else {
            console.error("Unexpected Error!!", error);
            return null;
        }
    }
}