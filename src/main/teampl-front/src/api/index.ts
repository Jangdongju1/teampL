import AuthCodeRequest from "../interface/request/authCodeRequest";
import axios from "axios";
import {AuthCodeConfirmResponse, AuthCodeResponse, ResponseDto, SignUpResponse} from "../interface/response";
import ApiEndPoint from "../common/ApiEndPoint";
import {AuthCodeConfirmRequest, SignInRequest, SignUpRequest} from "../interface/request";
import SignInResponse from "../interface/response/signInResponse";
import LoginUserResponse from "../interface/response/loginUserResponse";

const DOMAIN = "http://localhost:4000";
const apiEndPoint = (domain: string, indicator: string) => `${domain}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};


// 이메일 인증코드 요청.
export const authCodeRequest = async (requestBody: AuthCodeRequest) => {
    return await axios.post(apiEndPoint(DOMAIN, ApiEndPoint.EMAIL_AUTH_PATH), requestBody)
        .then(response => {
            const responseBody: AuthCodeResponse = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            if (!responseBody) return null;
            return responseBody;
        });
}

// 이메일 인증코드 확인요청
export const authCodeConfirmRequest = async (requestBody: AuthCodeConfirmRequest, token: string) => {
    return await axios.post(apiEndPoint(DOMAIN, ApiEndPoint.AUTH_CODE_CONFIRM_PATH), requestBody, Authorization(token))
        .then(response => {
            const responseBody: AuthCodeConfirmResponse = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            if (!responseBody) return null;
            return responseBody;
        });
}

// 회원가입 요청(비밀번호 등록)
export const signUpRequest = async (requestBody: SignUpRequest, token: string) => {
    return await axios.post(apiEndPoint(DOMAIN, ApiEndPoint.SIGN_UP), requestBody, Authorization(token))
        .then(response => {
            const responseBody: SignUpResponse = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            if (!responseBody) return null;

            return responseBody;
        });
}

// 로그인 요청
export const signInRequest = async (requestBody: SignInRequest) => {
    return await axios.post(apiEndPoint(DOMAIN, ApiEndPoint.SIGN_IN), requestBody)
        .then(response => {
            const responseBody: SignInResponse = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            if (!responseBody) return null;
            return responseBody;
        });
}

// 로그인된 유저인지 확인하는 요청
export const isLoginUserRequest = async (token: string) => {
    return await axios.get(apiEndPoint(DOMAIN, ApiEndPoint.LOGIN_USER), Authorization(token))
        .then(response => {
            const responseBody: LoginUserResponse = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
}
