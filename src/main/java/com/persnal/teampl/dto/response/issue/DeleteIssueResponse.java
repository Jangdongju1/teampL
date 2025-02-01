package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.temp.DeleteIssueResponseObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class DeleteIssueResponse {
    private final Integer deletedIssueId;
    private final Integer stat;


    public DeleteIssueResponse(Integer deletedIssueId, Integer stat) {
        this.deletedIssueId = deletedIssueId;
        this.stat = stat;
    }


    public static ResponseEntity<ApiResponse<DeleteIssueResponse>> success(DeleteIssueResponseObj response) {
        ApiResponse<DeleteIssueResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new DeleteIssueResponse(response.getIssueNum(), response.getStat()));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }


    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> notExistIssue() {
        return ResponseDto.notExistIssue();
    }
}
