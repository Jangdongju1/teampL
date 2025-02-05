package com.persnal.teampl.controller;

import com.persnal.teampl.dto.request.issue.*;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.issue.*;
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

    @PostMapping("")
    public ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(
            @RequestBody CreateIssueRequest req,
            @AuthenticationPrincipal String email) {

        return issueService.createIssue(req, email);
    }

    @GetMapping("/issue-list/{projectNum}")
    public ResponseEntity<? super ApiResponse<GetIssueListResponse>> getIssueList(
            @AuthenticationPrincipal String email,
            @PathVariable("projectNum") Integer projectNum) {
        return issueService.getIssueList(email, projectNum);
    }

    @GetMapping("/{issueNum}")
    public ResponseEntity<? super ApiResponse<GetPersonalIssueInfoResponse>> getPersonalIssueInfo(
            @AuthenticationPrincipal String email,
            @PathVariable("issueNum") Integer issueNum) {

        return issueService.getPersonalIssueInfo(email, issueNum);
    }

    @GetMapping("/team-issue-detail")
    public ResponseEntity<? super ApiResponse<GetTeamIssueInfoResponse>> getTeamIssueInfo(
            @AuthenticationPrincipal String email,
            @RequestParam("issueNum") Integer issueNum,
            @RequestParam("regNum") Integer regNum) {

        return issueService.getTeamIssueInfo(email, issueNum, regNum);
    }

//    // 사용하지 않는 api EndPoint
//    @GetMapping("/issue-list/{projectNum}/{status}")
//    public ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueListByStatus(
//            @AuthenticationPrincipal String email,
//            @PathVariable("projectNum") Integer projectNum,
//            @PathVariable("status") Integer status) {
//
//        return issueService.getPersonalIssueListByStatus(email, projectNum, status);
//    }


    @PatchMapping("/issue-title")
    public ResponseEntity<? super ApiResponse<PatchIssueTitleResponse>> patchTitle(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueTitleRequest req) {

        return issueService.patchIssueTitle(email, req);
    }

    @PatchMapping("/issue-priority")
    public ResponseEntity<? super ApiResponse<PatchIssuePriorityResponse>> patchPriority(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssuePriorityRequest req) {


        return issueService.patchIssuePriority(email, req);
    }

    @PatchMapping("/issue-status")
    public ResponseEntity<? super ApiResponse<PatchIssueStatusResponse>> patchStatus(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueStatusRequest req) {
        return issueService.patchIssueStatus(email, req);
    }

    @PatchMapping("/issue-category")
    public ResponseEntity<? super ApiResponse<PatchIssueCategoryResponse>> patchCategory(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueCategoryRequest req) {
        return issueService.patchIssueCategory(email, req);
    }

    @PatchMapping("/issue-expire-date")
    public ResponseEntity<? super ApiResponse<PatchIssueExpireDateResponse>> patchExpireDate(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueExpireDateRequest req) {

        return issueService.patchIssueExpireDate(email, req);
    }

    @PatchMapping("/issue-detail")
    public ResponseEntity<? super ApiResponse<PatchIssueDetailResponse>> patchDetail(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueDetailRequest req) {

        return issueService.patchIssueDetail(email, req);
    }

    @PostMapping("/issue-comment")
    public ResponseEntity<? super ApiResponse<PostIssueCommentResponse>> postComment(
            @AuthenticationPrincipal String email,
            @RequestBody PostIssueCommentRequest req) {

        return issueService.postIssueComment(email, req);
    }


    @GetMapping("/comment-list/{issueNum}")
    public ResponseEntity<? super ApiResponse<GetIssueCommentListResponse>> getCommentList(
            @AuthenticationPrincipal String email,
            @PathVariable("issueNum") Integer issueNum,
            @RequestParam("page") Integer page,
            @RequestParam("perPage") Integer perPage) {

        return issueService.getCommentList(email, issueNum, page, perPage);
    }

    @PatchMapping("/issue-comment")
    public ResponseEntity<? super ApiResponse<PatchIssueCommentResponse>> patchComment(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueCommentRequest req) {

        return issueService.patchComment(email, req);
    }

    @GetMapping("/total-comments-count/{issueNum}")
    public ResponseEntity<? super ApiResponse<GetCommentCountResponse>> getCommentCount(
            @AuthenticationPrincipal String email,
            @PathVariable("issueNum") Integer issueNum) {

        return issueService.getCommentCount(email, issueNum);
    }

    @PatchMapping("/drag/issue-status")
    public ResponseEntity<? super ApiResponse<PatchIssueStatusDragResponse>> patchIssueStatusDrag(
            @AuthenticationPrincipal String email,
            @RequestBody PatchIssueStatusDragRequest req) {

        return issueService.patchIssueStatusDrag(email, req);
    }

    @PatchMapping("/in-charge")
    public ResponseEntity<? super ApiResponse<PatchIssueInChargeResponse>> patchIssueInCharge(
            @RequestBody PatchIssueInChargeRequest req){
        return issueService.patchIssueInCharge(req);
    }

    @DeleteMapping("")
    public ResponseEntity<? super ApiResponse<DeleteIssueResponse>> deleteIssue(
            @AuthenticationPrincipal String email,
            @RequestParam(value = "issueNum", required = true) Integer issueNum,
            @RequestParam(value = "projectNum", required = true) Integer projectNum){

        return issueService.deleteIssue(email, issueNum, projectNum);
    }
}
