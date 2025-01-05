package com.persnal.teampl.dto.response.project;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.obj.temp.TeamInfo;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetTeamPrjListResponse {
    private final TeamInfo info;
    private final List<ProjectObj> list;



    public GetTeamPrjListResponse(List<ProjectObj> list, TeamInfo info) {
        this.list = list;
        this.info = info;
    }


    public static ResponseEntity<ApiResponse<GetTeamPrjListResponse>> success(GetTeamPrjListResponse response){
        ApiResponse<GetTeamPrjListResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                response);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistTeam(){
        return ResponseDto.notExistTeam();
    }
}
