package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.SearchUserObj;
import com.persnal.teampl.dto.response.ApiResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetSearchUserResponse {
    private final List<SearchUserObj> list;

    public GetSearchUserResponse(List<SearchUserObj> list) {
        this.list = list;
    }

    public static ResponseEntity<ApiResponse<GetSearchUserResponse>> success(List<SearchUserObj> list){
        ApiResponse<GetSearchUserResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetSearchUserResponse(list));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
