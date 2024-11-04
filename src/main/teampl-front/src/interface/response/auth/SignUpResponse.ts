import ResponseDto from "../ResponseDto";

export default interface SignUpResponse extends ResponseDto {
    data: {
        accessToken_Main: string,
        expireTimeSec: number
    };
}