package com.persnal.teampl.dto.response.team;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.temp.TeamInfo;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class RegistrationMemberResponse {
    private final TeamInfo info;

    public RegistrationMemberResponse(TeamInfo info) {
        this.info = info;
    }

    public static ResponseEntity<ApiResponse<RegistrationMemberResponse>> success(TeamInfo info) {
        ApiResponse<RegistrationMemberResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new RegistrationMemberResponse(info));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistTeam(){
        return ResponseDto.notExistTeam();
    }


}
