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
public class SignInResponse {
    private String accessToken_Main;
    private int expireTimeSec;


    public static ResponseEntity<ApiResponse<SignInResponse>> success(String token, int expires) {
        ApiResponse<SignInResponse> responseBody =
                new ApiResponse<>(
                        ResponseCode.SUCCESS,
                        ResponseMessage.SUCCESS,
                        new SignInResponse(token, expires));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }


    public static ResponseEntity<ResponseDto> invalidInformation(){
        return ResponseDto.validationFailed();
    }

    public static ResponseEntity<ResponseDto> notExistedUser(){
        return ResponseDto.notExistedUser();
    }


}
