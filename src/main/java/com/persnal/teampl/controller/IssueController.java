package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.issue.*;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.*;
import com.persnal.teampl.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.hibernate.result.UpdateCountOutput;
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
    public ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueList(
            @AuthenticationPrincipal String email,
            @PathVariable("projectNum") int projectNum) {

        return issueService.getPersonalIssueList(email, projectNum);
    }

    @GetMapping("/{issueNum}")
    public ResponseEntity<? super ApiResponse<GetPersonalIssueByNumResponse>> getPersonalIssue(
            @AuthenticationPrincipal String email,
            @PathVariable("issueNum") int issueNum) {

        return issueService.getPersonalIssue(email, issueNum);
    }


    // 사용하지 않는 api EndPoint
    @GetMapping("/issue-list/{projectNum}/{status}")
    public ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueListByStatus(
            @AuthenticationPrincipal String email,
            @PathVariable("projectNum") int projectNum,
            @PathVariable("status") int status) {

        return issueService.getPersonalIssueListByStatus(email, projectNum, status);
    }


    @PatchMapping("/modification/issue-title")
    public ResponseEntity<? super ApiResponse<PatchIssueTitleResponse>> patchTitle(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueTitleRequest req) {

        return issueService.patchIssueTitle(email, req);
    }

    @PatchMapping("/modification/issue-priority")
    public ResponseEntity<? super ApiResponse<PatchIssuePriorityResponse>> patchPriority(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssuePriorityRequest req) {


        return issueService.patchIssuePriority(email, req);
    }

    @PatchMapping("/modification/issue-status")
    public ResponseEntity<? super ApiResponse<PatchIssueStatusResponse>> patchStatus(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueStatusRequest req) {
        return issueService.patchIssueStatus(email, req);
    }

    @PatchMapping("/modification/issue-category")
    public ResponseEntity<? super ApiResponse<PatchIssueCategoryResponse>> patchCategory(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueCategoryRequest req) {
        return issueService.patchIssueCategory(email, req);
    }

    @PatchMapping("/modification/issue-expire-date")
    public ResponseEntity<? super ApiResponse<PatchIssueExpireDateResponse>> patchExpireDate(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueExpireDateRequest req) {

        return issueService.patchIssueExpireDate(email, req);
    }

    @PatchMapping("/modification/issue-detail")
    public ResponseEntity<? super ApiResponse<PatchIssueDetailResponse>> patchDetail(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueDetailRequest req) {

        return issueService.patchIssueDetail(email, req);
    }

    @PostMapping("/create/issue-comment")
    public ResponseEntity<? super ApiResponse<PostIssueCommentResponse>> postComment(
            @AuthenticationPrincipal String email,
            @RequestBody PostIssueCommentRequest req) {

        return issueService.postIssueComment(email, req);
    }

    @GetMapping("/test/{issueNum}")
    public ResponseEntity<? super ApiResponse<IssueDateTest>> issueDataTest(
            @AuthenticationPrincipal String email,
            @PathVariable("issueNum") int issueNum) {

        return issueService.getIssueTest(email, issueNum);
    }

    @GetMapping("/comment-list/{issueNum}")
    public ResponseEntity<? super ApiResponse<GetIssueCommentListResponse>> getCommentList(
            @AuthenticationPrincipal String email,
            @PathVariable("issueNum") Integer issueNum) {

        return issueService.getCommentList(email, issueNum);
    }

    @PatchMapping("/modification/issue-comment")
    public ResponseEntity<? super ApiResponse<PatchIssueCommentResponse>> patchComment(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueCommentRequest req) {

        return issueService.patchComment(email,req);
    }

}
