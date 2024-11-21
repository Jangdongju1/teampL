package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.IssueObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.entities.IssueEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetPersonalIssueListResponse {
    private final List<IssueObj> list;

    public GetPersonalIssueListResponse(List<IssueEntity> entities) {
        list = IssueEntity.getList(entities);
    }

    public static ResponseEntity<ApiResponse<GetPersonalIssueListResponse>> success(List<IssueEntity> entities) {
        ApiResponse<GetPersonalIssueListResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetPersonalIssueListResponse(entities));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }
    public static ResponseEntity<ResponseDto> notExistProject(){
        return ResponseDto.notExistProject();
    }
}
