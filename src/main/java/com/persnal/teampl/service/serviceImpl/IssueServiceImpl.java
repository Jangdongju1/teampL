package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.request.issue.*;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.issue.*;
import com.persnal.teampl.entities.IssueEntity;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.IssueRepository;
import com.persnal.teampl.repository.ProjectRepository;
import com.persnal.teampl.repository.UserRepository;
import com.persnal.teampl.service.IssueSequenceService;
import com.persnal.teampl.service.IssueService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final IssueSequenceService issueSequenceService;

    @Override
    public ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email) {
        String sequence;
        try {
            boolean isExistUser = userRepository.existsById(email);
            ProjectEntity projectEntity = projectRepository.findByProjectNum(req.getProjectNum());

            if (!isExistUser) return CreateIssueResponse.notExistUser();
            if (projectEntity == null) return CreateIssueResponse.notExistProject();

            IssueEntity currentIssueEntity =
                    issueRepository.findTopByProjectEntityProjectNumOrderByIssueNumDesc(req.getProjectNum());

            // 시퀀스 지정
            sequence = "";
            if (currentIssueEntity == null) {
                sequence = issueSequenceService.initSequenceValue();  // 초기값 세팅
            } else {
                sequence = issueSequenceService.addSequenceNumber(currentIssueEntity.getIssueSequence());  // 최근 이슈+1
            }

            // 최근 이슈의 ref 설정 => 새로 만들어지는 이슈를 참조 하도록 이슈의 상태를 고려해서 꼬리에 꼬리를 물어 참조할 수 있도록 한다.
            currentIssueEntity = issueRepository.findTopByProjectEntityProjectNumAndStatOrderByIssueNumDesc(req.getProjectNum(), req.getStat());
            if (currentIssueEntity != null) {
                currentIssueEntity.setRef(sequence);
            }

            // 1) projectNum, stat(Issue) ,  email
            //ProjectEntity projectEntity = ProjectEntity.fromRequest(req);
            UserEntity userEntity = UserEntity.fromRequest(email);
            IssueEntity issueEntity = IssueEntity.fromRequest(req.getStat(), userEntity, projectEntity, sequence);
            issueRepository.save(issueEntity);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreateIssueResponse.success(sequence);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueList(String email, int projectNum) {
        List<IssueEntity> entities = null;
        try {
            boolean isExistUser = userRepository.existsById(email);
            boolean isExistProject = projectRepository.existsById(projectNum);

            if (!isExistUser) return GetPersonalIssueListResponse.notExistUser();
            if (!isExistProject) return GetPersonalIssueListResponse.notExistProject();

            entities = issueRepository.findAllByProjectEntityProjectNum(projectNum);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPersonalIssueListResponse.success(entities);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueListByStatus(String email, int projectNum, int status) {
        List<IssueEntity> entities = null;
        try {
            boolean isExistUser = userRepository.existsById(email);
            boolean isExistProject = projectRepository.existsById(projectNum);

            if (!isExistUser) return GetPersonalIssueListResponse.notExistUser();
            if (!isExistProject) return GetPersonalIssueListResponse.notExistProject();

            entities = issueRepository.findAllByProjectEntityProjectNumAndStat(projectNum, status);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPersonalIssueListResponse.success(entities);
    }


    @Override
    public ResponseEntity<? super ApiResponse<PatchIssueTitleResponse>> patchIssueTitle(String Email, PatchIssueTitleRequest req) {
        try {
            boolean isExistUser = userRepository.existsById(Email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());


            if (!isExistUser) return PatchIssueTitleResponse.notExistUser();
            else if (!isExistProject) return PatchIssueTitleResponse.notExistProject();

            IssueEntity issueEntity = issueRepository.findByIssueNum(req.getIssueNum());
            if (issueEntity == null) return PatchIssueTitleResponse.notExistIssue();


            issueEntity.setTitle(req.getTitle());

            issueRepository.save(issueEntity);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueTitleResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<PatchIssuePriorityResponse>> patchIssuePriority(String email, PatchIssuePriorityRequest req) {
        try {
            boolean isExistUser = userRepository.existsById(email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());


            if (!isExistUser) return PatchIssuePriorityResponse.notExistUser();
            else if (!isExistProject) return PatchIssuePriorityResponse.notExistProject();

            IssueEntity issueEntity = issueRepository.findByIssueNum(req.getIssueNum());
            if (issueEntity == null) return PatchIssuePriorityResponse.notExistIssue();

            issueEntity.setPriority(req.getPriority());

            issueRepository.save(issueEntity);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssuePriorityResponse.success();
    }


    @Override
    public ResponseEntity<? super ApiResponse<PatchIssueStatusResponse>> patchIssueStatus(String email, PatchIssueStatusRequest req) {
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());

            if (!isExistUser) return PatchIssueStatusResponse.notExistUser();
            else if (!isExistProject) return PatchIssueStatusResponse.notExistProject();


            IssueEntity issueEntity = issueRepository.findByIssueNum(req.getIssueNum());

            if (issueEntity == null) return PatchIssueStatusResponse.notExistIssue();

            issueEntity.setStat(req.getStat());

            issueRepository.save(issueEntity);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueStatusResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<PatchIssueCategoryResponse>> patchIssueCategory(String email, PatchIssueCategoryRequest req) {
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());

            if (!isExistUser) return PatchIssueCategoryResponse.notExistUser();
            else if (!isExistProject) return PatchIssueCategoryResponse.notExistProject();

            IssueEntity issueEntity = issueRepository.findByIssueNum(req.getIssueNum());

            if (issueEntity == null) return PatchIssueCategoryResponse.notExistIssue();

            issueEntity.setCategory(req.getCategory());

            issueRepository.save(issueEntity);


        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueCategoryResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<PatchIssueExpireDateResponse>> patchIssueExpireDate(String email, PatchIssueExpireDateRequest req) {
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());

            if (!isExistUser) return PatchIssueExpireDateResponse.notExistUser();
            else if (!isExistProject) return PatchIssueExpireDateResponse.notExistProject();

            IssueEntity issueEntity = issueRepository.findByIssueNum(req.getIssueNum());

            if (issueEntity == null) return PatchIssueExpireDateResponse.notExistIssue();

            issueEntity.setExpireDate(req.getExpireDate());
            issueRepository.save(issueEntity);

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return null;
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalIssueByNumResponse>> getPersonalIssue(String email, int issueNum) {
        IssueEntity issueEntity = null;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);

            if (!isExistUser) return GetPersonalIssueByNumResponse.notExistUser();

            issueEntity = issueRepository.findByIssueNum(issueNum);

            if (issueEntity == null) return GetPersonalIssueByNumResponse.notExistIssue();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPersonalIssueByNumResponse.success(issueEntity);
    }

}
