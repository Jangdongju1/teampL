import ResponseDto from "../ResponseDto";
import {Issue} from "../../types";

export default interface CreateIssueResponse extends ResponseDto{
    data:{
        addedIssue:Issue
    }
}