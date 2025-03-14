import ResponseDto from "../ResponseDto";

export default interface LoginUserResponse extends ResponseDto{
    data: {
        email : string,
        nickname : string,
        profileImg : string
    }
}