package com.persnal.teampl.service;

import com.persnal.teampl.dto.respose.auth.SignUpResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public ResponseEntity<? super  SignUpResponse> signUpAuth(String email);
}
