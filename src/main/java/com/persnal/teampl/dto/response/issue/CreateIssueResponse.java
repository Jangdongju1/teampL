package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CreateIssueResponse {
    private final String sequence;

    public CreateIssueResponse(String sequence) {
        this.sequence = sequence;
    }
    public static ResponseEntity<ApiResponse<CreateIssueResponse>> success(String sequence) {
        ApiResponse<CreateIssueResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseCode.SUCCESS,
                new CreateIssueResponse(sequence));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> notExistProject(){
        return ResponseDto.notExistProject();
    }
}
