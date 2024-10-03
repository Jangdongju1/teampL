import SignUpRequest from "../interface/request/signUpRequest";
import axios from "axios";
import {ResponseDto, SignUpResponse} from "../interface/response";

const DOMAIN ="http://localhost:4000";
const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_UP_URL =() => `${API_DOMAIN}/auth/sign-up`;


// 회원가입 요청 == >  200 or 400
export const signUpRequest = async (requestBody : SignUpRequest) =>{
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response  =>{
            const responseBody : SignUpResponse = response.data;
            return responseBody;
        })
        .catch(error => {
            if(error.response.data) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })

    return result;
}


