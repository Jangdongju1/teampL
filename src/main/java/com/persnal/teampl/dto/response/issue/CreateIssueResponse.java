package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
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

    public CreateIssueResponse(IssueEntity entity) {
        this.addedIssue = IssueEntity.getIssue(entity);
    }
    public static ResponseEntity<ApiResponse<CreateIssueResponse>> success(IssueEntity entity) {
        ApiResponse<CreateIssueResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseCode.SUCCESS,
                new CreateIssueResponse(entity));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> notExistProject(){
        return ResponseDto.notExistProject();
    }
}
