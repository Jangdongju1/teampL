package com.persnal.teampl.dto.respose.auth;
import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@Getter
public class SignUpResponse  extends ResponseDto {
    private String email;

    public SignUpResponse(String email){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = email;
    }

    public static ResponseEntity<SignUpResponse> success(String email) {
        SignUpResponse response = new SignUpResponse(email);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
