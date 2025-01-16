package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.dto.request.project.CreateTeamPrjRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.project.*;
import org.springframework.http.ResponseEntity;

public interface ProjectService {
    ResponseEntity<? super ApiResponse<CreatePrjResponse>> createPersonalPrj(String email, CreatePrjRequest request);
    ResponseEntity<? super ApiResponse<CreateTeamPrjResponse>> createTeamPrj(String email, CreateTeamPrjRequest req);
    ResponseEntity<? super ApiResponse<GetPrjListResponse>> getProjectList(String email);
    ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>>getPersonalPrjInfo(String email, int projectNum);
    ResponseEntity<? super ApiResponse<GetPersonalPrjListResponse>>getPersonalPrjList(String email);
    ResponseEntity<? super ApiResponse<GetTeamPrjListResponse>>getTeamPrjList(String email, Integer regNum);

}
