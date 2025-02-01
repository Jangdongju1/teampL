package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.issue.*;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.*;
import org.springframework.http.ResponseEntity;

public interface IssueService {
    ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email);

    ResponseEntity<? super ApiResponse<GetIssueListResponse>> getIssueList(String email, Integer projectNum);

    ResponseEntity<? super ApiResponse<PatchIssueTitleResponse>> patchIssueTitle(String Email, PatchIssueTitleRequest req);

    ResponseEntity<? super ApiResponse<GetPersonalIssueInfoResponse>> getPersonalIssueInfo(String email, Integer issueNum);

    ResponseEntity<? super ApiResponse<GetTeamIssueInfoResponse>> getTeamIssueInfo(String email, Integer issueNum, Integer regNum);

    ResponseEntity<? super ApiResponse<PatchIssuePriorityResponse>> patchIssuePriority(String email, PatchIssuePriorityRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueStatusResponse>> patchIssueStatus(String email,  PatchIssueStatusRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueCategoryResponse>> patchIssueCategory(String email, PatchIssueCategoryRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueExpireDateResponse>> patchIssueExpireDate(String email , PatchIssueExpireDateRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueDetailResponse>> patchIssueDetail(String email, PatchIssueDetailRequest req);

    ResponseEntity<? super ApiResponse<PostIssueCommentResponse>> postIssueComment(String email, PostIssueCommentRequest req);

    ResponseEntity<? super ApiResponse<GetIssueCommentListResponse>> getCommentList(String email, Integer issueNum, Integer page, Integer perPage);

    ResponseEntity<? super ApiResponse<PatchIssueCommentResponse>> patchComment(String email, PatchIssueCommentRequest req);

    ResponseEntity<? super ApiResponse<GetCommentCountResponse>> getCommentCount(String email, Integer issueNum);

    ResponseEntity<? super ApiResponse<PatchIssueStatusDragResponse>> patchIssueStatusDrag(String email, PatchIssueStatusDragRequest req);

    ResponseEntity<? super ApiResponse<PatchIssueInChargeResponse>> patchIssueInCharge(PatchIssueInChargeRequest req);

    ResponseEntity<? super ApiResponse<DeleteIssueResponse>> deleteIssue(String email, Integer issueNum, Integer projectNum);



}
