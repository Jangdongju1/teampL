package com.persnal.teampl.dto.response.project;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.ProjectInfoObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetPrjListResponse {

    private final List<ProjectInfoObj> list;

    public GetPrjListResponse(List<ProjectInfoObj> result) {
        this.list = result;
    }

    public static ResponseEntity<ApiResponse<GetPrjListResponse>> success(List<ProjectInfoObj> result) {
        ApiResponse<GetPrjListResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetPrjListResponse(result));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseDto.notExistedUser();
    }

}
