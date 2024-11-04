package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CreateIssueResponse {

    public static ResponseEntity<ApiResponse<CreateIssueResponse>> success() {
        ApiResponse<CreateIssueResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseCode.SUCCESS,
                null);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> notExistProject(){
        return ResponseDto.notExistProject();
    }
}
