package com.persnal.teampl.contoller;

import com.persnal.teampl.jwt.webTokenModule.WebTokenProvider;
import com.persnal.teampl.service.AuthService;
import com.persnal.teampl.service.MailAuthService;
import com.persnal.teampl.dto.request.auth.SignUpRequest;
import com.persnal.teampl.dto.respose.auth.SignUpResponse;
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

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponse> signUp(@Validated @RequestBody SignUpRequest signUpRequest) {
        ResponseEntity<? super SignUpResponse> response = authService.signUpAuth(signUpRequest.getEmail());
        return response;
    }
}
