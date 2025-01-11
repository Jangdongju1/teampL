import ResponseDto from "../ResponseDto";
import {SearchUser} from "../../types";

export default interface InvitationMemberResponse extends  ResponseDto{
    data : {
        // 초대된 멤버에 대한 응답값
        invitedMember : SearchUser[];
    }
}