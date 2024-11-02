package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.Enum.project.ProjectType;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.dto.request.project.GetPersonalPrjInfoRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.project.CreateProjectResponse;
import com.persnal.teampl.dto.response.project.GetPersonalPrjInfoResponse;
import com.persnal.teampl.dto.response.project.GetPersonalPrjListResponse;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.ProjectRepository;
import com.persnal.teampl.repository.UserRepository;
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

    @Override
    public ResponseEntity<? super ApiResponse<CreateProjectResponse>> createPersonalPrj(String email, CreatePrjRequest request) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return CreateProjectResponse.notExistUser();


            ProjectEntity entity = ProjectEntity.fromRequest(email, userEntity, request);

            //ProjectEntity entity = new ProjectEntity(email, userEntity, request);

            projectRepository.save(entity);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreateProjectResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalPrjListResponse>> getPersonalPrjList(String email) {
        List<ProjectEntity> projectEntities = null;
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetPersonalPrjListResponse.notExistUser();


            projectEntities = projectRepository.findByUserEntityEmailAndProjectType(
                    userEntity.getEmail(),
                    ProjectType.PERSONAL_PROJECT.getValue());


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPersonalPrjListResponse.success(projectEntities);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>> getPersonalPrjInfo(String email, GetPersonalPrjInfoRequest req) {
        ProjectEntity projectInfo = null;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);

            if (!isExistUser) return GetPersonalPrjInfoResponse.notExistUser();

            projectInfo = projectRepository.findByProjectNum(req.getProjectNum());

            if (projectInfo == null) return GetPersonalPrjInfoResponse.resourceNotFound();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return GetPersonalPrjInfoResponse.success(projectInfo);
    }
}