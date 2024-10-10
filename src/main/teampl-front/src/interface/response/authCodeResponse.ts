import ResponseDto from "./ResponseDto";

export default interface AuthCodeResponse extends ResponseDto {
    data: {
        email: string,
        accessToken_Auth: string
        expireTimeSec: number
    }
}