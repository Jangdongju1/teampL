import ResponseDto from "../ResponseDto";

export default interface PatchNicknameResponse extends  ResponseDto{
    data : {
        changedNickname : string
    }
}