package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.temp.PatchIssueTitleRepObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PatchIssueTitleResponse {
    private final Integer projectNum;
    private final Integer issueNum;
    private final Integer issueStat;
    private final String changedTitle;

    public PatchIssueTitleResponse(PatchIssueTitleRepObj repData){
        this.projectNum = repData.getProjectNum();
        this.issueNum = repData.getIssueNum();
        this.issueStat = repData.getStat();
        this.changedTitle = repData.getChangedTitle();
    }
    public static ResponseEntity<ApiResponse<PatchIssueTitleResponse>> success(PatchIssueTitleRepObj repData) {
        ApiResponse<PatchIssueTitleResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new PatchIssueTitleResponse(repData));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }

    public static ResponseEntity<ResponseDto> notExistIssue(){
        return ResponseDto.notExistIssue();
    }

    public static ResponseEntity<ResponseDto> notExistProject(){
        return ResponseDto.notExistProject();
    }
}
