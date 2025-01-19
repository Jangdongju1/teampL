import ResponseDto from "../ResponseDto";
import {Issue} from "../../types";

export default  interface GetPersonalIssueInfoResponse extends ResponseDto{
    data : {
        issue : Issue
    }
}