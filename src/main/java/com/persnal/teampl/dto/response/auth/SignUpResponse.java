package com.persnal.teampl.dto.response.auth;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class SignUpResponse {
    private String accessToken_Main;
    private int expireTimeSec;


    public static ResponseEntity<ApiResponse<SignUpResponse>> success(String accessToken_Main, int expireTimeSec) {
        ApiResponse<SignUpResponse> responseBody =
                new ApiResponse<>(
                        ResponseCode.SUCCESS,
                        ResponseMessage.SUCCESS,
                        new SignUpResponse(accessToken_Main, expireTimeSec));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existedUser(){
        return ResponseDto.existedUser();
    }
}
