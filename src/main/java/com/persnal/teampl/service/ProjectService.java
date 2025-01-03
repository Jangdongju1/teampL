package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.project.CreateProjectResponse;
import com.persnal.teampl.dto.response.project.GetPersonalPrjInfoResponse;
import com.persnal.teampl.dto.response.project.GetPrjListPaginationResponse;
import com.persnal.teampl.dto.response.project.GetPrjListResponse;
import org.springframework.http.ResponseEntity;

public interface ProjectService {
    ResponseEntity<? super ApiResponse<CreateProjectResponse>> createPersonalPrj(String email, CreatePrjRequest request);
    ResponseEntity<? super ApiResponse<GetPrjListPaginationResponse>> getProjectListPagination(String email);
    ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>>getPersonalPrjInfo(String email, int projectNum);
    ResponseEntity<? super ApiResponse<GetPrjListResponse>>getProjectList(String email);
}
