package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@NoArgsConstructor
public class LoginUserResponse {

    public static ResponseEntity<? super ApiResponse<LoginUserResponse>> success(){
        ApiResponse<LoginUserResponse> responseBody =
                new ApiResponse<>(ResponseCode.SUCCESS,
                        ResponseMessage.LOGIN_USER, null);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }
}
