package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PatchPasswordResponse {

    public static ResponseEntity<ApiResponse<PatchPasswordResponse>> success() {
        ApiResponse<PatchPasswordResponse> responseBody =
                new ApiResponse<>(
                        ResponseCode.SUCCESS,
                        ResponseMessage.SUCCESS,
                        null);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> passwordNotMatched(){
        return ResponseDto.passwordNotMatched();
    }


}

