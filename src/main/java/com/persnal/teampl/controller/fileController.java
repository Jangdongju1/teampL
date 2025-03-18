package com.persnal.teampl.controller;

import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.user.ProfileImgUploadResponse;
import com.persnal.teampl.dto.response.user.ProfileImgUrlResponse;
import com.persnal.teampl.service.FileService;
import com.persnal.teampl.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class fileController {
    // 서비스 레이어 주입.
    private final UserService userService;
    private final FileService fileService;

    @PatchMapping("/profile-image")
    public ResponseEntity<? super ApiResponse<ProfileImgUploadResponse>> patchProfileImage(
            @AuthenticationPrincipal String email, @RequestParam("profileImg") MultipartFile profileImg) {

        return userService.patchProfileImg(email, profileImg);
    }

    @GetMapping(value = "/uploads/{filename}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Resource getProfileImg(
            @AuthenticationPrincipal String email,
            @PathVariable("filename") String filename) {
        return fileService.getImage(filename);
    }
}
