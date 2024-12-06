import {IssueComment} from "../../types";
import ResponseDto from "../ResponseDto";

export default interface GetIssueCommentResponse extends ResponseDto {
    data: {
        commentList: IssueComment[];
    }
}