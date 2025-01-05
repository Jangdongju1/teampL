package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.dto.request.project.CreateTeamPrjRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.project.*;
import com.persnal.teampl.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/create-project")
    public ResponseEntity<? super ApiResponse<CreatePrjResponse>> createProject(
            @AuthenticationPrincipal String email,
            @RequestBody CreatePrjRequest req) {

        return projectService.createPersonalPrj(email, req);
    }

    @PostMapping("/create-team-project")
    public ResponseEntity<? super ApiResponse<CreateTeamPrjResponse>> createTeamProject(
            @RequestBody CreateTeamPrjRequest req,
            @AuthenticationPrincipal String email){

        return projectService.createTeamPrj(email,req);
    }

    @GetMapping("/t-project-list")
    public ResponseEntity<? super ApiResponse<GetPrjListPaginationResponse>> getProjectListPagination(
            @AuthenticationPrincipal String email) {

        return projectService.getProjectListPagination(email);
    }

    @GetMapping("/personal-project-info/{projectNum}")
    public ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>> getPersonalPrjInfo(
            @AuthenticationPrincipal String email,
            @PathVariable("projectNum") int projectNum) {

        return projectService.getPersonalPrjInfo(email, projectNum);
    }

    @GetMapping("/project-list")
    public ResponseEntity<? super ApiResponse<GetPrjListResponse>> getProjectList(
            @AuthenticationPrincipal String email) {

        return projectService.getProjectList(email);
    }

}
