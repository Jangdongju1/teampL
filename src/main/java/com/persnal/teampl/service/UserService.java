package com.persnal.teampl.service;

import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.user.GetInvitationListResponse;
import com.persnal.teampl.dto.response.user.GetSearchUserResponse;
import com.persnal.teampl.dto.response.user.LoginUserResponse;
import org.springframework.http.ResponseEntity;

public interface UserService{
    ResponseEntity<? super ApiResponse<LoginUserResponse>> isLoginUser(String email);
    ResponseEntity<? super ApiResponse<GetSearchUserResponse>> userSearch(String email,String word);
    ResponseEntity<? super ApiResponse<GetInvitationListResponse>> getInvitationList(String email);

}
