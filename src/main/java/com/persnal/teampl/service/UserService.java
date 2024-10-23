package com.persnal.teampl.service;

import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.user.LoginUserResponse;
import org.springframework.http.ResponseEntity;

public interface UserService{
    ResponseEntity<? super ApiResponse<LoginUserResponse>> isLoginUser(String email);
}
