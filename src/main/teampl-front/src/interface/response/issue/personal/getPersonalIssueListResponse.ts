import {Issue} from "../../../types";
import ResponseDto from "../../ResponseDto";

export default interface GetPersonalIssueListResponse extends ResponseDto{
    data : {
        list : Issue[];
    }
}