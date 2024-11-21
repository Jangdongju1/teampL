package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.dto.request.issue.PatchIssueTitleRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.CreateIssueResponse;
import com.persnal.teampl.dto.response.issue.GetPersonalIssueByNumResponse;
import com.persnal.teampl.dto.response.issue.GetPersonalIssueListResponse;
import com.persnal.teampl.dto.response.issue.PatchIssueTitleResponse;
import org.springframework.http.ResponseEntity;

public interface IssueService {
    ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email);

    ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueList(String email, int projectNum);

    ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueListByStatus(String email, int projectNum, int status);

    ResponseEntity<? super ApiResponse<PatchIssueTitleResponse>> patchIssueTitle(String Email, PatchIssueTitleRequest req);

    ResponseEntity<? super ApiResponse<GetPersonalIssueByNumResponse>> getPersonalIssue(String email, int issueNum);
}
