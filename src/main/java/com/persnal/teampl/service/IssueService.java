package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.issue.*;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.*;
import org.springframework.http.ResponseEntity;

public interface IssueService {
    ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email);

    ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueList(String email, int projectNum);

    ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueListByStatus(String email, int projectNum, int status);

    ResponseEntity<? super ApiResponse<PatchIssueTitleResponse>> patchIssueTitle(String Email, PatchIssueTitleRequest req);

    ResponseEntity<? super ApiResponse<GetPersonalIssueByNumResponse>> getPersonalIssue(String email, int issueNum);

    ResponseEntity<? super ApiResponse<PatchIssuePriorityResponse>> patchIssuePriority(String email, PatchIssuePriorityRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueStatusResponse>> patchIssueStatus(String email,  PatchIssueStatusRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueCategoryResponse>> patchIssueCategory(String email, PatchIssueCategoryRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueExpireDateResponse>> patchIssueExpireDate(String email , PatchIssueExpireDateRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueDetailResponse>> patchIssueDetail(String email, PatchIssueDetailRequest req);

    ResponseEntity<? super ApiResponse<PostIssueCommentResponse>> postIssueComment(String email, PostIssueCommentRequest req);

    ResponseEntity<? super ApiResponse<IssueDateTest>> getIssueTest(String email, Integer issueNum);


}
