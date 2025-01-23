package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.dto.obj.IssueInfoObj;
import com.persnal.teampl.dto.obj.IssueObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.entities.IssueEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CreateIssueResponse {
    private final IssueObj addedIssue;

    public CreateIssueResponse(IssueObj addedIssue) {
        this.addedIssue = addedIssue;
    }
    public static ResponseEntity<ApiResponse<CreateIssueResponse>> success(IssueObj addedIssue) {
        ApiResponse<CreateIssueResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseCode.SUCCESS,
                new CreateIssueResponse(addedIssue));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> notExistProject(){
        return ResponseDto.notExistProject();
    }
}
