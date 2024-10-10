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
public class AuthCodeConfirmResponse {
    private String accessToken_Main;
    private int expireTimeSec;


    public static ResponseEntity<ApiResponse<AuthCodeConfirmResponse>> success(String token, int expireTimeSec){
        ApiResponse<AuthCodeConfirmResponse> responseBody =
                new ApiResponse<>(
                        ResponseCode.SUCCESS,
                        ResponseMessage.SUCCESS,
                        new AuthCodeConfirmResponse(token, expireTimeSec));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<Response> expiredCode(){
       Response responseBody = new Response(ResponseCode.EXPIRE_AUTH_CODE, ResponseMessage.EXPIRE_AUTH_CODE);
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<Response> invalidCode(){
        Response responseBody = new Response(ResponseCode.AUTHENTICATION_FAILED, ResponseMessage.AUTHENTICATION_FAILED);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
