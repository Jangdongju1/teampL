package com.persnal.teampl.dto.response.team;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.CreatedTeamInfo;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CreateTeamResponse {
    private final CreatedTeamInfo teamInfo;

    public CreateTeamResponse(CreatedTeamInfo info) {
        this.teamInfo = info;
    }

    public static ResponseEntity<ApiResponse<CreateTeamResponse>> success(CreatedTeamInfo info) {
        ApiResponse<CreateTeamResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new CreateTeamResponse(info));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseDto.notExistedUser();
    }
}
