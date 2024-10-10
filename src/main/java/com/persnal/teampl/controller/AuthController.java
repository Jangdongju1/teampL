package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.auth.AuthCodeRequest;
import com.persnal.teampl.dto.request.auth.AuthCodeConfirmRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeConfirmResponse;
import com.persnal.teampl.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/auth-code")
    public ResponseEntity<? super ApiResponse<AuthCodeResponse>> authCodeRequest(
            @Validated
            @RequestBody AuthCodeRequest request) {
        ResponseEntity<? super ApiResponse<AuthCodeResponse>> responseBody = authService.signUpAuth(request.getEmail());
        return responseBody;
    }

    @PostMapping("/confirm-code")
    public ResponseEntity<? super ApiResponse<AuthCodeConfirmResponse>> authCodeConfirm(
            @Validated
            @RequestBody AuthCodeConfirmRequest request) {

        ResponseEntity<? super ApiResponse<AuthCodeConfirmResponse>> responseBody =
                authService.confirmCode(request.getEmail(), request.getCode());
        return responseBody;
    }

}
