import AuthCodeRequest from "../interface/request/auth/authCodeRequest";
import axios from "axios";
import {AuthCodeConfirmResponse, AuthCodeResponse, ResponseDto, SignUpResponse} from "../interface/response";
import {AUTH_CODE_CONFIRM_URL, EMAIL_AUTH_URL, LOGIN_USER_URL, SIGN_IN_URL, SIGN_UP_URL} from "../common/apiEndPoint";
import {AuthCodeConfirmRequest, SignInRequest, SignUpRequest} from "../interface/request";
import SignInResponse from "../interface/response/auth/signInResponse";
import LoginUserResponse from "../interface/response/user/loginUserResponse";

const DOMAIN = "http://localhost:4000";
const apiEndPoint = (domain: string, indicator: string) => `${domain}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};


// 이메일 인증코드 요청.
export const authCodeRequest = async (requestBody: AuthCodeRequest) => {
    return await axios.post(apiEndPoint(DOMAIN, EMAIL_AUTH_URL()), requestBody)
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
    return await axios.post(apiEndPoint(DOMAIN, AUTH_CODE_CONFIRM_URL()), requestBody, Authorization(token))
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
    return await axios.post(apiEndPoint(DOMAIN, SIGN_UP_URL()), requestBody, Authorization(token))
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
    return await axios.post(apiEndPoint(DOMAIN, SIGN_IN_URL()), requestBody)
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
    return await axios.get(apiEndPoint(DOMAIN, LOGIN_USER_URL()), Authorization(token))
        .then(response => {
            const responseBody: LoginUserResponse = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
}

