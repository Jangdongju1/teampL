package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PatchNicknameResponse {
    private final String changedNickname;

    public PatchNicknameResponse(String changedNickname) {
        this.changedNickname = changedNickname;
    }


    public static ResponseEntity<ApiResponse<PatchNicknameResponse>> success(String changedNickname) {
        ApiResponse<PatchNicknameResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new PatchNicknameResponse(changedNickname));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }
}
