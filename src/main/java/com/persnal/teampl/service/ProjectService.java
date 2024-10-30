package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.project.CreateProjectRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.project.CreateProjectResponse;
import com.persnal.teampl.dto.response.project.GetPersonalPrjListResponse;
import org.springframework.http.ResponseEntity;

public interface ProjectService {
    ResponseEntity<? super ApiResponse<CreateProjectResponse>> createPersonalPrj(String email, CreateProjectRequest request);
    ResponseEntity<? super ApiResponse<GetPersonalPrjListResponse>>getPersonalPrjList(String email);
}
