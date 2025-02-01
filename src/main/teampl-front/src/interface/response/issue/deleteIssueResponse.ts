import ResponseDto from "../ResponseDto";

export default interface DeleteIssueResponse extends ResponseDto{
    data : {
        deletedIssueId : number,
        stat : number
    }

}