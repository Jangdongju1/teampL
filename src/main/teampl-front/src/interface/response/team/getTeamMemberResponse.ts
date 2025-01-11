import ResponseDto from "../ResponseDto";
import {TeamMember} from "../../types";

export default interface GetTeamMemberResponse extends  ResponseDto{
    data : {
        list : TeamMember[]
    }
}