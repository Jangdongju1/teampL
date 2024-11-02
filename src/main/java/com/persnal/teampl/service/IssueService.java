package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.CreateIssueResponse;
import org.springframework.http.ResponseEntity;

public interface IssueService {
    ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email);
}
