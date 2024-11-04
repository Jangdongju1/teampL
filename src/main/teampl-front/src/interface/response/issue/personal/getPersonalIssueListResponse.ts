import {Issue} from "../../../types";

export default interface GetPersonalIssueListResponse{
    data : {
        list : Issue[];
    }
}