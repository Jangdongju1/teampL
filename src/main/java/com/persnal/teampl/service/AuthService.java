package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.auth.SigInRequest;
import com.persnal.teampl.dto.request.auth.SignUpRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeConfirmResponse;
import com.persnal.teampl.dto.response.auth.SignInResponse;
import com.persnal.teampl.dto.response.auth.SignUpResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public ResponseEntity<? super ApiResponse<AuthCodeResponse>> signUpAuth(String email);

    public ResponseEntity<? super ApiResponse<AuthCodeConfirmResponse>> confirmCode(String email, String code);

    public ResponseEntity<? super ApiResponse<SignUpResponse>> signUp(String email, SignUpRequest req);

    public ResponseEntity<? super ApiResponse<SignInResponse>> signIn(SigInRequest req);
}

