package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class LoginUserResponse {
    private final String email;
    private final String nickname;
    private final String profileImg;

    public LoginUserResponse(String email, String nickname, String profileImg) {
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }

    public static ResponseEntity<? super ApiResponse<LoginUserResponse>> success(String email, String nickname, String profileImg){
        ApiResponse<LoginUserResponse> responseBody =
                new ApiResponse<>(ResponseCode.SUCCESS,
                        ResponseMessage.LOGIN_USER, new LoginUserResponse(email, nickname, profileImg));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }
}
