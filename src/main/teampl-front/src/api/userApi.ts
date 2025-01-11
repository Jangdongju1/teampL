import {DOMAIN, GET_SEARCH_USER} from "../constant/indicator";
import axios from "axios";
import {GetSearchUserResponse, ResponseDto} from "../interface/response";

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



