package com.persnal.teampl.dto.response.auth;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class AuthCodeConfirmResponse {

    public static ResponseEntity<ApiResponse<AuthCodeConfirmResponse>> success(){
        ApiResponse<AuthCodeConfirmResponse> responseBody =
                new ApiResponse<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, null);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> expiredCode(){
       return ResponseDto.expireCode();
    }

    public static ResponseEntity<ResponseDto> invalidCode(){
        return ResponseDto.invalidCode();
    }
}
