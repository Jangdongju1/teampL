package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.auth.AuthCodeRequest;
import com.persnal.teampl.dto.request.auth.AuthCodeConfirmRequest;
import com.persnal.teampl.dto.request.auth.SignInRequest;
import com.persnal.teampl.dto.request.auth.SignUpRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeConfirmResponse;
import com.persnal.teampl.dto.response.auth.SignInResponse;
import com.persnal.teampl.dto.response.auth.SignUpResponse;
import com.persnal.teampl.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/auth-code")
    public ResponseEntity<? super ApiResponse<AuthCodeResponse>> emailAuth(
            @Validated
            @RequestBody AuthCodeRequest request) {
        return authService.signUpAuth(request.getEmail());
    }

    @PostMapping("/confirm-code")
    public ResponseEntity<? super ApiResponse<AuthCodeConfirmResponse>> emailCodeConfirm(
            @Validated
            @RequestBody AuthCodeConfirmRequest request, @AuthenticationPrincipal String email) {
        return authService.confirmCode(email, request.getCode());
    }

    @PostMapping("/sign-up")
    public ResponseEntity<? super ApiResponse<SignUpResponse>> signUp(@AuthenticationPrincipal String email,
                                                                      @Validated @RequestBody SignUpRequest request) {
        return authService.signUp(email, request);
    }
//
//    @PostMapping("/sign-in")
//    public ResponseEntity<? super ApiResponse<SignInResponse>> signUP(@Validated @RequestBody SignInRequest req) {
//        return authService.signIn(req);
//    }

}
