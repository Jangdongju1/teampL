package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.IssueInfoObj;
import com.persnal.teampl.dto.obj.TeamMemberObj;
import com.persnal.teampl.dto.obj.temp.TeamIssueInfoFetchData;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetTeamIssueInfoResponse {
    private final IssueInfoObj issue;
    private final List<TeamMemberObj> members;

    public GetTeamIssueInfoResponse(IssueInfoObj issue, List<TeamMemberObj> members) {
        this.issue = issue;
        this.members = members;
    }


    public static ResponseEntity<ApiResponse<GetTeamIssueInfoResponse>> success(TeamIssueInfoFetchData data) {
        ApiResponse<GetTeamIssueInfoResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetTeamIssueInfoResponse(data.getIssue(), data.getMembers()));
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }


    public static ResponseEntity<ResponseDto> notExistTeam(){
        return ResponseDto.notExistTeam();
    }

    public static ResponseEntity<ResponseDto> notExistIssue(){
        return ResponseDto.notExistIssue();
    }

}
