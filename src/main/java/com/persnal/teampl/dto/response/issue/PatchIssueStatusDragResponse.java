package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PatchIssueStatusDragResponse {

    public static ResponseEntity<ApiResponse<PatchIssueStatusDragResponse>> success() {
        ApiResponse<PatchIssueStatusDragResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                null);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistIssue() {
        return ResponseDto.notExistIssue();
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseDto.notExistedUser();
    }

}