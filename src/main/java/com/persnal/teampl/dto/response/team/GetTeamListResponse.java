package com.persnal.teampl.dto.response.team;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.TeamListObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.entities.TeamEntity;
import com.persnal.teampl.repository.resultSet.GetTeamListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetTeamListResponse {

    private final List<TeamListObj> list;

    public GetTeamListResponse(List<GetTeamListResultSet> resultSets) {
        this.list =  TeamEntity.getList(resultSets);;
    }

    public static ResponseEntity<ApiResponse<GetTeamListResponse>> success(List<GetTeamListResultSet> resultSets) {
        ApiResponse<GetTeamListResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetTeamListResponse(resultSets));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }
}
