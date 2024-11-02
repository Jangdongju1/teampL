package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.CreateIssueResponse;
import com.persnal.teampl.repository.IssueRepository;
import com.persnal.teampl.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/issue")
@RequiredArgsConstructor
public class IssueController {
    private final IssueService issueService;
    @PostMapping("/create-issue")
    public ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(
            @RequestBody CreateIssueRequest req,
            @AuthenticationPrincipal String email){

        return issueService.createIssue(req,email);
    }
}
