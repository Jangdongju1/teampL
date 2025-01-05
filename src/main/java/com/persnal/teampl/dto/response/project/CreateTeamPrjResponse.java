package com.persnal.teampl.dto.response.project;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CreateTeamPrjResponse {
    private final ProjectObj created;

    public CreateTeamPrjResponse(ProjectObj info) {
        this.created = info;
    }

    public static ResponseEntity<ApiResponse<CreateTeamPrjResponse>> success(ProjectObj info){
        ApiResponse<CreateTeamPrjResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new CreateTeamPrjResponse(info)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto>  notExistTeam(){
        return ResponseDto.notExistTeam();
    }
}
