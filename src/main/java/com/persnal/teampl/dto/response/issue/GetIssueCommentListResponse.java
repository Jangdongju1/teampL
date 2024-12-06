package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.IssueCommentObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.entities.IssueCommentEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetIssueCommentListResponse {

    List<IssueCommentObj> commentList;

    public GetIssueCommentListResponse(List<IssueCommentEntity> entities){
        this.commentList = IssueCommentEntity.getList(entities);

    }


    public static ResponseEntity<ApiResponse<GetIssueCommentListResponse>> success(List<IssueCommentEntity> entities) {
        ApiResponse<GetIssueCommentListResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetIssueCommentListResponse(entities)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> notExistIssue() {
        return ResponseDto.notExistIssue();
    }
}
