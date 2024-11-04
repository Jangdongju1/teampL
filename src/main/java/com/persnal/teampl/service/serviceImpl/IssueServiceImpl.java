package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.issue.CreateIssueResponse;
import com.persnal.teampl.dto.response.issue.GetPersonalIssueResponse;
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

import java.util.LinkedList;
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
        try {
            boolean isExistUser = userRepository.existsById(email);
            ProjectEntity projectEntity = projectRepository.findByProjectNum(req.getProjectNum());

            if (!isExistUser) return CreateIssueResponse.notExistUser();
            if (projectEntity == null) return ResponseDto.notExistProject();

            IssueEntity currentIssueEntity =
                    issueRepository.findTopByProjectEntityProjectNumOrderByIssueNumDesc(req.getProjectNum());

            // 시퀀스 지정
            String sequence = "";
            if (currentIssueEntity == null) {
                // 등록된 이슈가 없는 경우
                sequence = issueSequenceService.initSequenceValue();  // 초기값 세팅
            } else {
                sequence = issueSequenceService.addSequenceNumber(currentIssueEntity.getIssueSequence());  // 최근 이슈+1
                // 최근 이슈의 ref 설정 => 새로 만들어지는 이슈를 참조하도록
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
        return CreateIssueResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalIssueResponse>> getPersonalIssueList(String email, int projectNum) {
        List<IssueEntity> entities = null;
        try {
            boolean isExistUser = userRepository.existsById(email);
            boolean isExistProject = projectRepository.existsById(projectNum);

            if (!isExistUser) return GetPersonalIssueResponse.notExistUser();
            if (!isExistProject) return GetPersonalIssueResponse.notExistProject();

            entities = issueRepository.findAllByProjectEntityProjectNum(projectNum);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPersonalIssueResponse.success(entities);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalIssueResponse>> getPersonalIssueListByStatus(String email, int projectNum, int status) {
        List<IssueEntity> entities = null;
        try {
            boolean isExistUser = userRepository.existsById(email);
            boolean isExistProject = projectRepository.existsById(projectNum);

            if (!isExistUser) return GetPersonalIssueResponse.notExistUser();
            if (!isExistProject) return GetPersonalIssueResponse.notExistProject();

            entities = issueRepository.findAllByProjectEntityProjectNumAndStat(projectNum, status);


        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPersonalIssueResponse.success(entities);
    }
}
