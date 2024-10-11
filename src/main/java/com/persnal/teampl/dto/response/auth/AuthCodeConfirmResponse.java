package com.persnal.teampl.dto.response.auth;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.Response;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class AuthCodeConfirmResponse {
    public AuthCodeConfirmResponse() {
    }

    public static ResponseEntity<Response> success(){
        Response responseBody = new Response(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
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
