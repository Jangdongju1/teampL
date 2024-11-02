package com.persnal.teampl.service.serviceImpl;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.issue.CreateIssueResponse;
import com.persnal.teampl.entities.IssueEntity;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.IssueRepository;
import com.persnal.teampl.repository.ProjectRepository;
import com.persnal.teampl.repository.UserRepository;
import com.persnal.teampl.service.IssueService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Override
    public ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email) {
        try {
            boolean isExistUser = userRepository.existsById(email);
            ProjectEntity projectEntity = projectRepository.findByProjectNum(req.getProjectNum());

            if (!isExistUser) return CreateIssueResponse.notExistUser();
            if (projectEntity == null) return ResponseDto.notExistProject();

            // 1) projectNum, stat(Issue) ,  email
            //ProjectEntity projectEntity = ProjectEntity.fromRequest(req);
            UserEntity userEntity = UserEntity.fromRequest(email);

            IssueEntity issueEntity = IssueEntity.fromRequest(req.getStat(), userEntity, projectEntity);

            issueRepository.save(issueEntity);


        }catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreateIssueResponse.success();
    }
}
