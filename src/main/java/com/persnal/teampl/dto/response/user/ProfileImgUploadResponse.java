package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ProfileImgUploadResponse {
    private final String imageUrl;

    public ProfileImgUploadResponse(String imageUrl) {

        this.imageUrl = imageUrl;
    }

    public static ResponseEntity<ApiResponse<ProfileImgUploadResponse>> success(String url){
        ApiResponse<ProfileImgUploadResponse> response = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new ProfileImgUploadResponse(url));

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }

}
