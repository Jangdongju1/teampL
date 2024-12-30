package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.team.CreateTeamRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.team.CreateTeamResponse;
import com.persnal.teampl.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
