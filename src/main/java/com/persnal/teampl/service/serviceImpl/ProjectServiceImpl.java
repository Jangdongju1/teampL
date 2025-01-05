package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.ProjectInfoObj;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.dto.request.project.CreateTeamPrjRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.project.*;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.jpa.ProjectRepository;
import com.persnal.teampl.repository.jpa.TeamRepository;
import com.persnal.teampl.repository.jpa.UserRepository;
import com.persnal.teampl.service.ProjectService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    @Override
    public ResponseEntity<? super ApiResponse<CreatePrjResponse>> createPersonalPrj(String email, CreatePrjRequest request) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return CreatePrjResponse.notExistUser();


            ProjectEntity entity = ProjectEntity.fromRequest(email, userEntity, request);

            //ProjectEntity entity = new ProjectEntity(email, userEntity, request);

            projectRepository.save(entity);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreatePrjResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<CreateTeamPrjResponse>> createTeamPrj(String email, CreateTeamPrjRequest req) {
        ProjectEntity projectEntity = null;

        try {
            boolean isExistTeam = teamRepository.existsById(req.getRegNum());

            if (!isExistTeam) return CreateTeamPrjResponse.notExistTeam();

            projectEntity = ProjectEntity.fromRequest(email, req);

            projectRepository.save(projectEntity);

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreateTeamPrjResponse.success(projectEntity);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPrjListPaginationResponse>> getProjectListPagination(String email) {
        List<ProjectObj> list = null;
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetPrjListPaginationResponse.notExistUser();

            list = projectRepository.getProjectListPagination(email);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPrjListPaginationResponse.success(list);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>> getPersonalPrjInfo(String email, int projectNum) {
        ProjectEntity projectInfo = null;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);

            if (!isExistUser) return GetPersonalPrjInfoResponse.notExistUser();

            projectInfo = projectRepository.findByProjectNum(projectNum);

            if (projectInfo == null) return GetPersonalPrjInfoResponse.resourceNotFound();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return GetPersonalPrjInfoResponse.success(projectInfo);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPrjListResponse>> getProjectList(String email) {
        List<ProjectInfoObj> list = null;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            if (!isExistUser) return GetPrjListResponse.notExistUser();

            list = projectRepository.getProjectList(email);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPrjListResponse.success(list);
    }
}
