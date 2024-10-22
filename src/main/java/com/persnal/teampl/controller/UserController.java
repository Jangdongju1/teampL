package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.user.Test;
import com.persnal.teampl.dto.response.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @PostMapping("/test")
    public ResponseEntity<ResponseDto> isLoginUser(@RequestBody Test t) {
        System.out.println("isLoginUser");
        return null;
    }
}
