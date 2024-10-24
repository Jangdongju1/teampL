package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.request.project.CreateProjectRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.project.CreateProjectResponse;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.TeamEntity;
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

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super ApiResponse<CreateProjectResponse>> createProject(String email, CreateProjectRequest request) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return CreateProjectResponse.notExistUser();

            TeamEntity teamEntity = new TeamEntity(-1);  // 팀이 없는경우 -1

            ProjectEntity entity = new ProjectEntity(email, userEntity, teamEntity, request);

            projectRepository.save(entity);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreateProjectResponse.success();
    }
}
