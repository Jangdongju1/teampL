package com.persnal.teampl.service;

import com.persnal.teampl.dto.respose.auth.SignUpResponse;
import org.springframework.http.ResponseEntity;

public interface OAuthService {
    public ResponseEntity<? super SignUpResponse> sendAuthentication(String email);
}
