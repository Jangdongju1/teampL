package com.persnal.teampl.dto.response.team;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.TeamMemberObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class GetTeamMemberResponse {
    private final List<TeamMemberObj> list;

    public GetTeamMemberResponse(List<TeamMemberObj> list) {
        this.list = list;
    }


    public static ResponseEntity<ApiResponse<GetTeamMemberResponse>> success(List<TeamMemberObj> list) {
        ApiResponse<GetTeamMemberResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetTeamMemberResponse(list));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }


    public static ResponseEntity<ResponseDto> notExistTeam(){
        return ResponseDto.notExistTeam();
    }

}
