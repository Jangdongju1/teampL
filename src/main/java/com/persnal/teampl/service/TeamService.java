package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.team.CreateTeamRequest;
import com.persnal.teampl.dto.request.team.InvitationMemberRequest;
import com.persnal.teampl.dto.request.team.RegistrationMemberRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.team.*;
import org.springframework.http.ResponseEntity;

public interface TeamService {
    ResponseEntity<? super ApiResponse<CreateTeamResponse>> createTeam(String email, CreateTeamRequest req);
    ResponseEntity<? super ApiResponse<GetTeamListResponse>> getTeamList(String email);
    ResponseEntity<? super ApiResponse<GetTeamMemberResponse>> getTeamMemberList(String email, Integer regNum);
    ResponseEntity<? super ApiResponse<InvitationMemberResponse>> invitationMember(String email , InvitationMemberRequest req);
    ResponseEntity<? super ApiResponse<RegistrationMemberResponse>> registrationMember(String email, RegistrationMemberRequest req);
}
