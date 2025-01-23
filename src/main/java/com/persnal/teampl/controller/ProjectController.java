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

    // 프로젝트 생성후 프로젝트 정보를 리턴해 주어야함. (수정사항)
    @PostMapping("")
    public ResponseEntity<? super ApiResponse<CreatePrjResponse>> createProject(
            @AuthenticationPrincipal String email,
            @RequestBody CreatePrjRequest req) {

        return projectService.createPersonalPrj(email, req);
    }

    @PostMapping("/team-project")
    public ResponseEntity<? super ApiResponse<CreateTeamPrjResponse>> createTeamProject(
            @RequestBody CreateTeamPrjRequest req,
            @AuthenticationPrincipal String email){

        return projectService.createTeamPrj(email,req);
    }

    @GetMapping("/project-list")
    public ResponseEntity<? super ApiResponse<GetPrjListResponse>> getProjectList(
            @AuthenticationPrincipal String email) {
        return projectService.getProjectList(email);
    }

    @GetMapping("/personal-project-list")
    public ResponseEntity<? super ApiResponse<GetPersonalPrjListResponse>>getPersonalPrjList(
            @AuthenticationPrincipal String email){
        return projectService.getPersonalPrjList(email);
    }

    @GetMapping("/team-project-list")
    public ResponseEntity<? super ApiResponse<GetTeamPrjListResponse>> getTeamPrjList(
            @AuthenticationPrincipal String email,
            @RequestParam("regNum") Integer regNum){

        return projectService.getTeamPrjList(email, regNum);
    }

    @GetMapping("/project-info/{projectNum}")
    public ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>> getPrjInfo(
            @AuthenticationPrincipal String email,
            @PathVariable("projectNum") int projectNum) {

        return projectService.getPersonalPrjInfo(email, projectNum);
    }

}
