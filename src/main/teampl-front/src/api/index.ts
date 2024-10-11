import AuthCodeRequest from "../interface/request/authCodeRequest";
import axios from "axios";
import {AuthCodeResponse, ResponseDto} from "../interface/response";
import ApiEndPoint from "../common/ApiEndPoint";
import {AuthCodeConfirmRequest} from "../interface/request";
import AuthCodeConfirmResponse from "../interface/response/authCodeConfirmResponse";

const DOMAIN ="http://localhost:4000";
const apiEndPoint = (domain: string, indicator:string) => `${domain}${indicator}`;

const Authorization = (token:string) => {
    return {headers: {Authorization:`Bearer ${token}`}};
};


// 회원가입 요청 == >  200 or 400
export const authCodeRequest = async (requestBody : AuthCodeRequest) =>{
    const result = await axios.post(apiEndPoint(DOMAIN, ApiEndPoint.EMAIL_AUTH_PATH), requestBody)
        .then(response  =>{
            const responseBody : AuthCodeResponse = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })

    return result;
}

// security 세팅후 토큰인증처리해야함.
export const authCodeConfirmRequest = async (requestBody : AuthCodeConfirmRequest, token : string)=>{
    const result =
        await axios.post(apiEndPoint(DOMAIN,ApiEndPoint.AUTH_CODE_CONFIRM_PATH), requestBody, Authorization(token))
        .then(response =>{
            const responseBody : AuthCodeConfirmResponse = response.data;
            return responseBody;
        })
        .catch(error =>{
            if (!error.response.data) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


