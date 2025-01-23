package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.IssueObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetIssueListResponse {
    private final List<IssueObj> list;

    public GetIssueListResponse(List<IssueObj> list) {
        this.list = list;
    }

    public static ResponseEntity<ApiResponse<GetIssueListResponse>> success(List<IssueObj> list) {
        ApiResponse<GetIssueListResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetIssueListResponse(list));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }
    public static ResponseEntity<ResponseDto> notExistProject(){
        return ResponseDto.notExistProject();
    }
}
