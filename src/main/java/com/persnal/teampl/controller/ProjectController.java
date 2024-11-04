package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.dto.request.project.GetPersonalPrjInfoRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.project.CreateProjectResponse;
import com.persnal.teampl.dto.response.project.GetPersonalPrjInfoResponse;
import com.persnal.teampl.dto.response.project.GetPersonalPrjListResponse;
import com.persnal.teampl.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
public class ProjectController {

    private  final ProjectService projectService;
    @PostMapping("/create-project")
    public ResponseEntity<? super ApiResponse<CreateProjectResponse>> createProject(
            @AuthenticationPrincipal String email,
            @RequestBody CreatePrjRequest req) {

        return projectService.createPersonalPrj(email, req);
    }

    @GetMapping("/personal-project")
    public ResponseEntity<? super ApiResponse<GetPersonalPrjListResponse>> getPersonalPrjList(
            @AuthenticationPrincipal String email){

        return projectService.getPersonalPrjList(email);
    }

    @GetMapping("/personal-project-info/{projectNum}")
    public ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>> getPersonalPrjInfo(
            @AuthenticationPrincipal String email,
            @PathVariable("projectNum") int projectNum){

        return projectService.getPersonalPrjInfo(email, projectNum);
    }
}
