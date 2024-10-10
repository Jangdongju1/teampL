import ResponseDto from "./ResponseDto";
export default interface AuthCodeConfirmResponse extends ResponseDto{
    accessToken_Main : string,
    expireTimeSec : number
}