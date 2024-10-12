package com.persnal.teampl.dto.response.auth;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class AuthCodeConfirmResponse {

    public static ResponseEntity<ResponseDto> success(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> expiredCode(){
       return ResponseDto.expireCode();
    }

    public static ResponseEntity<ResponseDto> invalidCode(){
        return ResponseDto.invalidCode();
    }
}
