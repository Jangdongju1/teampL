package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.obj.temp.TeamInfo;
import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.dto.request.project.CreateTeamPrjRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.project.*;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.TeamEntity;
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
        ProjectObj info = null;
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return CreatePrjResponse.notExistUser();


            ProjectEntity entity = ProjectEntity.fromRequest(email, userEntity, request);


            projectRepository.save(entity);

            info = ProjectObj.builder()
                    .projectNum(entity.getProjectNum())
                    .projectName(entity.getProjectName())
                    .description(entity.getDescription())
                    .createDate(entity.getCreateDate())
                    .creator(entity.getUserEntity().getEmail())
                    .stat(entity.getStat())
                    .projectType(entity.getProjectType())
                    .regNum(null)
                    .teamName(null)
                    .processed(0L)
                    .totalIssueCnt(0L)
                    .build();



        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreatePrjResponse.success(info);
    }

    @Override
    public ResponseEntity<? super ApiResponse<CreateTeamPrjResponse>> createTeamPrj(String email, CreateTeamPrjRequest req) {
        ProjectObj info = null;

        try {
            boolean isExistTeam = teamRepository.existsById(req.getRegNum());

            if (!isExistTeam) return CreateTeamPrjResponse.notExistTeam();

            TeamEntity team = teamRepository.findByRegNum(req.getRegNum());

            ProjectEntity projectEntity = ProjectEntity.fromRequest(email, req);

            projectRepository.save(projectEntity);

            info = ProjectObj.builder()
                    .projectNum(projectEntity.getProjectNum())
                    .projectName(projectEntity.getProjectName())
                    .description(projectEntity.getDescription())
                    .createDate(projectEntity.getCreateDate())
                    .creator(projectEntity.getUserEntity().getEmail())
                    .stat(projectEntity.getStat())
                    .projectType(projectEntity.getProjectType())
                    .regNum(team.getRegNum())
                    .teamName(team.getTeamName())
                    .processed((0L))  // 기본값
                    .totalIssueCnt(0L) // 기본값
                    .build();



        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreateTeamPrjResponse.success(info);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPrjListResponse>> getProjectList(String email) {
        List<ProjectObj> list = null;
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetPrjListResponse.notExistUser();

            list = projectRepository.getProjectList(email);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPrjListResponse.success(list);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalPrjListResponse>> getPersonalPrjList(String email) {
        List<ProjectObj> list = null;
        try {
            boolean isExistUser  = userRepository.existsById(email);

            if (!isExistUser) return GetPersonalPrjListResponse.notExistUser();

            list = projectRepository.getPersonalProjectList(email);


        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPersonalPrjListResponse.success(list);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetTeamPrjListResponse>> getTeamPrjList(String email, Integer regNum) {

        GetTeamPrjListResponse response = null;
        try {
            boolean isExistTeam = teamRepository.existsById(regNum);
            if (!isExistTeam) return GetTeamPrjListResponse.notExistTeam();

            List<ProjectObj> list = projectRepository.getTeamProjectList(email, regNum);

            TeamEntity team = teamRepository.findByRegNum(regNum);

            TeamInfo info = TeamInfo.builder()
                    .teamName(team.getTeamName())
                    .description(team.getDescription())
                    .creator(team.getEmail())
                    .sequence(team.getSequence())
                    .build();

            response = new GetTeamPrjListResponse(list, info);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetTeamPrjListResponse.success(response);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>> getPersonalPrjInfo(String email, int projectNum) {
        ProjectEntity projectInfo = null;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);

            if (!isExistUser) return GetPersonalPrjInfoResponse.notExistUser();

            projectInfo = projectRepository.findByProjectNum(projectNum);

            if (projectInfo == null) return GetPersonalPrjInfoResponse.notExistProject();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return GetPersonalPrjInfoResponse.success(projectInfo);
    }
}
