package com.persnal.teampl.contoller;

import com.persnal.teampl.dto.request.auth.SignUpRequest;
import com.persnal.teampl.dto.respose.auth.SignUpResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponse> signUp(@Validated @RequestBody SignUpRequest signUpRequest){
        ResponseEntity<? super SignUpResponse> response = new SignUpResponse().success();
        return response;
    }
}
