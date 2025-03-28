package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.user.PatchNicknameRequest;
import com.persnal.teampl.dto.request.user.PatchPasswordRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.user.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService{
    ResponseEntity<? super ApiResponse<LoginUserResponse>> isLoginUser(String email);
    ResponseEntity<? super ApiResponse<GetSearchUserResponse>> userSearch(String email,String word);
    ResponseEntity<? super ApiResponse<GetInvitationListResponse>> getInvitationList(String email);
    ResponseEntity<? super ApiResponse<ProfileImgUploadResponse>> patchProfileImg(String email, MultipartFile file);
    ResponseEntity<? super ApiResponse<PatchNicknameResponse>> patchNickname(String email, PatchNicknameRequest req);
    ResponseEntity<? super ApiResponse<PatchPasswordResponse>> patchPassword(String email, PatchPasswordRequest req);
}
