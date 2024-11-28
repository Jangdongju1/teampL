import ResponseDto from "../ResponseDto";
import {Issue} from "../../types";

export default  interface GetPersonalIssueByNumResponse extends ResponseDto{
    data : {
        issue : Issue
    }
}