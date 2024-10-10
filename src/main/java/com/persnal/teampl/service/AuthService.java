package com.persnal.teampl.service;

import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeConfirmResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public ResponseEntity<? super ApiResponse<AuthCodeResponse>> signUpAuth(String email);
    public ResponseEntity<? super ApiResponse<AuthCodeConfirmResponse>> confirmCode(String email, String password);
}

