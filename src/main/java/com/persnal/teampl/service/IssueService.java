package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.dto.request.issue.PatchIssueTitleRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.CreateIssueResponse;
import com.persnal.teampl.dto.response.issue.GetPersonalIssueResponse;
import com.persnal.teampl.dto.response.issue.PatchIssueTitleResponse;
import org.springframework.http.ResponseEntity;

public interface IssueService {
    ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email);

    ResponseEntity<? super ApiResponse<GetPersonalIssueResponse>> getPersonalIssueList(String email, int projectNum);

    ResponseEntity<? super ApiResponse<GetPersonalIssueResponse>> getPersonalIssueListByStatus(String email, int projectNum, int status);

    ResponseEntity<? super ApiResponse<PatchIssueTitleResponse>> patchIssueTitle(String Email, PatchIssueTitleRequest req);
}
