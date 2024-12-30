import {CREATE_TEAM, DOMAIN} from "../constant/indicator";
import {CreateTeamRequest} from "../interface/request";
import axios from "axios";
import {CreateTeamResponse, ResponseDto} from "../interface/response";

const BASE_URL = "/api/v1/team"
const apiEndPoint = (indicator: string) => `${DOMAIN}${BASE_URL}${indicator}`;

const Authorization = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
};

export const createTeamRequest = async (requestBody: CreateTeamRequest, accessToken: string) => {
    try {
        const result =
            await axios.post(apiEndPoint(CREATE_TEAM()), requestBody, Authorization(accessToken));
        const responseBody: CreateTeamResponse = result.data;
        return responseBody;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log("unexpected axios error!!!!")
                return null;
            }
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        } else {
            console.error(error)
            return null;
        }
    }
}