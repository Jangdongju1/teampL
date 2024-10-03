package com.persnal.teampl.dto.respose.auth;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.ResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class SignUpResponse  extends ResponseDto {
    private String email;

    public SignUpResponse(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<SignUpResponse> success() {
        SignUpResponse response = new SignUpResponse();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
