import ResponseDto from "../ResponseDto";
export default interface GetCommentCountResponse extends  ResponseDto{
    data : {
        totalCount : number
    }
}