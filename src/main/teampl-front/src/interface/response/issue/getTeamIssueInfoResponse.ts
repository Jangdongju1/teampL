import ResponseDto from "../ResponseDto";
import {Issue, TeamMember} from "../../types";

export default interface GetTeamIssueInfoResponse extends ResponseDto{
    data : {
        members : TeamMember[],
        issue : Issue
    }
}