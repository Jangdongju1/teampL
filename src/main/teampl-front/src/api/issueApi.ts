import axios from "axios";
import ApiEndPoint from "../common/apiEndPoint";
import CreateIssueResponse from "../interface/response/createIssueResponse";
import {ResponseDto} from "../interface/response";
import CreateIssueRequest from "../interface/request/createIssueRequest";

const DOMAIN = "http://localhost:4000";
const apiEndPoint = (domain: string, indicator: string) => `${domain}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};


export const createIssueRequest =  async (requestBody:CreateIssueRequest,accessToken:string)=>{
    try {
        const result =
            await axios.post(apiEndPoint(DOMAIN,ApiEndPoint.CREATE_ISSUE),requestBody,Authorization(accessToken));
        const responseBody:CreateIssueResponse = result.data;

        return responseBody;
    }catch (error){
        if (axios.isAxiosError(error)){
            // axios error 의 경우
            if (!error.response) return null;
            const responseBody : ResponseDto = error.response.data;

            return responseBody;
        }else {
            console.log("unexpected Error", error);
            return null;
        }

    }
}