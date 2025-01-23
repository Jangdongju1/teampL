package com.persnal.teampl.controller;

import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.user.GetInvitationListResponse;
import com.persnal.teampl.dto.response.user.GetSearchUserResponse;
import com.persnal.teampl.dto.response.user.LoginUserResponse;
import com.persnal.teampl.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/login-user")
    public ResponseEntity<? super ApiResponse<LoginUserResponse>> isLoginUser(@AuthenticationPrincipal String email) {

        return userService.isLoginUser(email);
    }

    @GetMapping("/search-user")
    public ResponseEntity<? super ApiResponse<GetSearchUserResponse>> searchUser(
            @AuthenticationPrincipal String email,
            @RequestParam(value = "word", required = true) String word) {

        return userService.userSearch(email, word);
    }

    @GetMapping("/invitation-list")
    public ResponseEntity<? super ApiResponse<GetInvitationListResponse>> getInvitationList(
            @AuthenticationPrincipal String email) {
        return userService.getInvitationList(email);
    }
}
