import {
    DOMAIN,
    GET_INVITATION_LIST,
    GET_SEARCH_USER,
    PATCH_NICKNAME,
    PATCH_PASSWORD,
    PATCH_PROFILE_IMAGE
} from "../constant/indicator";
import axios from "axios";
import {
    GetInvitationListResponse,
    GetSearchUserResponse, PatchPasswordResponse,
    ProfileImgUploadResponse,
    ResponseDto
} from "../interface/response";
import {PatchNicknameRequest, PatchPasswordRequest} from "../interface/request";
import PatchNicknameResponse from "../interface/response/user/patchNicknameResponse";

const BASE_URL = "/api/v1/user"
const apiEndPoint = (indicator: string) => `${DOMAIN}${BASE_URL}${indicator}`;

// 요청헤더에 Token 포함.
const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};


// 팀원 검색시 유저 검색요청.
export const getSearchUserRequest = async (word: string, accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_SEARCH_USER(word)), Authorization(accessToken));

        const responseBody: GetSearchUserResponse = result.data;

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


export const getInvitationListRequest = async (accessToken: string) => {
    try {
        const result =
            await axios.get(apiEndPoint(GET_INVITATION_LIST()), Authorization(accessToken));

        const responseBody: GetInvitationListResponse = result.data;
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

// 파일 업로드 요청 : 유저 프로필 이미지 업로드용
export const profileImgUploadRequest = async (data: FormData, accessToken: string) => {
    // data로 multipart/from-data를 보내면 axois에서 자동으로 컨텐츠 타입을 맞춰 준다고 한다.
    try {
        const requestURL = `http://localhost:4000/file${PATCH_PROFILE_IMAGE()}`;  //파일 업로드의 경우 서버에서 따로 컨트롤러로 관리
        const result = await axios.patch(requestURL, data, Authorization(accessToken));

        const responseBody: ProfileImgUploadResponse = result.data;

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

// 닉네임 변경 요청
export const patchNicknameRequest = async (requestBody: PatchNicknameRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_NICKNAME()), requestBody, Authorization(accessToken));

        const responseBody: PatchNicknameResponse = result.data;
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

// 비밀번호 변경 요청.
export const patchPasswordRequest = async (requestBody: PatchPasswordRequest, accessToken: string) => {
    try {
        const result =
            await axios.patch(apiEndPoint(PATCH_PASSWORD()), requestBody, Authorization(accessToken));

        const responseBody: PatchPasswordResponse = result.data;
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


