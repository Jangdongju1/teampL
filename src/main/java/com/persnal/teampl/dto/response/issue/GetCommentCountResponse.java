package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetCommentCountResponse {
    private final Integer totalCount;

    public GetCommentCountResponse(Integer count) {
        this.totalCount = count;
    }

    public static ResponseEntity<ApiResponse<GetCommentCountResponse>> success(Integer count) {
        ApiResponse<GetCommentCountResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetCommentCountResponse(count)
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
