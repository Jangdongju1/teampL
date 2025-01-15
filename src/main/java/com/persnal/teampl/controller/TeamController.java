package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.team.CreateTeamRequest;
import com.persnal.teampl.dto.request.team.InvitationMemberRequest;
import com.persnal.teampl.dto.request.team.RegistrationMemberRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.team.*;
import com.persnal.teampl.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;  // 스프링 컨테이너에서 자동 주입


    @PostMapping("/create-team")
    public ResponseEntity<? super ApiResponse<CreateTeamResponse>> createTeam(
            @AuthenticationPrincipal String email,
            @RequestBody CreateTeamRequest req) {

        return teamService.createTeam(email, req);
    }

    @GetMapping("/team-list")
    public ResponseEntity<? super ApiResponse<GetTeamListResponse>> getTeamList(
            @AuthenticationPrincipal String email) {
        return teamService.getTeamList(email);
    }


    @GetMapping("/team-member")
    public ResponseEntity<? super ApiResponse<GetTeamMemberResponse>> getTeamMemberList(
            @AuthenticationPrincipal String email,
            @RequestParam("regNum") Integer regNum){
        return teamService.getTeamMemberList(email, regNum);
    }

    @PostMapping("/invitation-member")
    public ResponseEntity<? super ApiResponse<InvitationMemberResponse>> invitationMember(
            @AuthenticationPrincipal String email, @RequestBody InvitationMemberRequest req){

        return teamService.invitationMember(email,req);
    }

    @PostMapping("/registration-member")
    public ResponseEntity<? super ApiResponse<RegistrationMemberResponse>> registrationMember(
            @AuthenticationPrincipal String email,
            @RequestBody RegistrationMemberRequest req){

        return teamService.registrationMember(email,req);
    }

}
