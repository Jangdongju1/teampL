package com.persnal.teampl.dto.response;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ResponseDto {
    private String code;
    private String message;


    public static ResponseEntity<ResponseDto> initialServerError() {
        ResponseDto response = new ResponseDto(ResponseCode.INITIAL_SERVER_ERROR, ResponseMessage.INITIAL_SERVER_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    public static ResponseEntity<ResponseDto> validationFailed() {
        ResponseDto response = new ResponseDto(ResponseCode.SIGN_IN_FAILED, ResponseMessage.SIGN_IN_FAILED);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    public static ResponseEntity<ResponseDto> existedUser() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.EXIST_USER,ResponseMessage.EXIST_USER);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> emailAlreadySent(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.ALREADY_SENT, ResponseMessage.ALREADY_SENT);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> expireCode(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.EXPIRE_AUTH_CODE, ResponseMessage.EXPIRE_AUTH_CODE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    public static ResponseEntity<ResponseDto> invalidCode(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.AUTHENTICATION_FAILED, ResponseMessage.AUTHENTICATION_FAILED);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistedUser(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

}