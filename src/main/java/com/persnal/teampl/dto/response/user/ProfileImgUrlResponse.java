package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ProfileImgUrlResponse {

    private final Resource profileResource;

    public ProfileImgUrlResponse(Resource profileResource) {
        this.profileResource = profileResource;
    }


    public static ResponseEntity<ApiResponse<ProfileImgUrlResponse>> success(Resource profileResource) {

        ApiResponse<ProfileImgUrlResponse> response = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new ProfileImgUrlResponse(profileResource));


        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.initialServerError();
    }
}
