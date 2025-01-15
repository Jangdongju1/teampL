import ResponseDto from "../ResponseDto";
import {Invitation} from "../../types";

export default interface GetInvitationListResponse extends ResponseDto{
    data : {
        list : Invitation[];
    }
}