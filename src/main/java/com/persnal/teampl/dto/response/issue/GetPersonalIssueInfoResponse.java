package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.IssueInfoObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.entities.IssueEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetPersonalIssueInfoResponse {
    IssueInfoObj issue;

    public GetPersonalIssueInfoResponse(IssueEntity entity){
        this.issue = IssueEntity.getIssue(entity);
    }


    public static ResponseEntity<ApiResponse<GetPersonalIssueInfoResponse>> success(IssueEntity entity){
        ApiResponse<GetPersonalIssueInfoResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetPersonalIssueInfoResponse(entity)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> notExistIssue(){
        return ResponseDto.notExistIssue();
    }
}
