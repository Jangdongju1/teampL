package com.persnal.teampl.dto.response.project;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetPersonalPrjListResponse {

    private final List<ProjectObj> list;

    public GetPersonalPrjListResponse(List<ProjectObj> result) {
        this.list = result;
    }

    public static ResponseEntity<ApiResponse<GetPersonalPrjListResponse>> success(List<ProjectObj> result) {
        ApiResponse<GetPersonalPrjListResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetPersonalPrjListResponse(result));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseDto.notExistedUser();
    }

}
