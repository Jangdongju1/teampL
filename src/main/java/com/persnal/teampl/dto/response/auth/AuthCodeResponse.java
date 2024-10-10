package com.persnal.teampl.dto.response.auth;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.Response;
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

    public static ResponseEntity<Response> existUser(){
        Response responseBody = new Response(ResponseCode.EXIST_USER, ResponseMessage.EXIST_USER);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<Response> emailAlreadySent(){
        Response responseBody = new Response(ResponseCode.ALREADY_SENT, ResponseMessage.ALREADY_SENT);

        return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
    }

}
