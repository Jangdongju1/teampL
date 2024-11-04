package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.CreateIssueResponse;
import com.persnal.teampl.dto.response.issue.GetPersonalIssueResponse;
import com.persnal.teampl.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/issue")
@RequiredArgsConstructor
public class IssueController {
    private final IssueService issueService;

    @PostMapping("/create-issue")
    public ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(
            @RequestBody CreateIssueRequest req,
            @AuthenticationPrincipal String email) {

        return issueService.createIssue(req, email);
    }

    @GetMapping("/issue-list/{projectNum}")
    public ResponseEntity<? super ApiResponse<GetPersonalIssueResponse>> getPersonalIssueList(
            @AuthenticationPrincipal String email,
            @PathVariable("projectNum") int projectNum) {

        return issueService.getPersonalIssueList(email, projectNum);
    }

    @GetMapping("/issue-list/{projectNum}/{status}")
    public ResponseEntity<? super ApiResponse<GetPersonalIssueResponse>> getPersonalIssueListByStatus(
            @AuthenticationPrincipal String email,
            @PathVariable("projectNum") int projectNum,
            @PathVariable("status") int status) {


        return issueService.getPersonalIssueListByStatus(email, projectNum, status);
    }

}
