package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.team.CreateTeamRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.team.CreateTeamResponse;
import com.persnal.teampl.dto.response.team.GetTeamListResponse;
import org.springframework.http.ResponseEntity;

public interface TeamService {
    ResponseEntity<? super ApiResponse<CreateTeamResponse>> createTeam(String email, CreateTeamRequest req);
    ResponseEntity<? super ApiResponse<GetTeamListResponse>> getTeamList(String email);

}
