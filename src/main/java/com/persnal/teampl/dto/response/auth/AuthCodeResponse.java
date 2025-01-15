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
public class AuthCodeResponse{
    private String email;
    private String accessToken_Auth;
    private int expireTimeSec;


    public static ResponseEntity<ApiResponse<AuthCodeResponse>> success(String email, String accessToken) {
        ApiResponse<AuthCodeResponse> responseBody =
                new ApiResponse<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, new AuthCodeResponse(email, accessToken, 300));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> existUser(){
        return ResponseDto.existedUser();
    }

    public static ResponseEntity<ResponseDto> emailAlreadySent(){
        return ResponseDto.RequestAlreadySent();
    }

}
