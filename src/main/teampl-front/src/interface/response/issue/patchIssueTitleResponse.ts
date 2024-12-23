import ResponseDto from "../ResponseDto";

export default interface PatchIssueTitleResponse extends ResponseDto {
    data: {
        projectNum : number,
        issueNum : number,
        issueStat : number,
        changedTitle : string,
    }
}