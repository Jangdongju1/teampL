import {Team} from "../../types";

export default interface GetTeamResponse{
    data : {
        list : Team[]
    }
}