package com.persnal.teampl.dto.response.project;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
@Builder
public class GetPrjListPaginationResponse {
    private final List<ProjectObj> list;
    public GetPrjListPaginationResponse(List<ProjectObj> result) {
        this.list = result;

    }

    public static ResponseEntity<? super ApiResponse<GetPrjListPaginationResponse>> success(List<ProjectObj> list) {
        ApiResponse<GetPrjListPaginationResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetPrjListPaginationResponse(list));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        return ResponseDto.notExistedUser();
    }


}
