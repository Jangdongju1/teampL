package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.IssueCommentReq;
import com.persnal.teampl.dto.obj.temp.IssueCommentFetchData;
import com.persnal.teampl.dto.request.issue.*;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.issue.*;
import com.persnal.teampl.entities.IssueCommentEntity;
import com.persnal.teampl.entities.IssueEntity;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.jpa.CommentRepository;
import com.persnal.teampl.repository.jpa.IssueRepository;
import com.persnal.teampl.repository.jpa.ProjectRepository;
import com.persnal.teampl.repository.jpa.UserRepository;
import com.persnal.teampl.service.IssueSequenceService;
import com.persnal.teampl.service.IssueService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final CommentRepository commentRepository;
    private final IssueSequenceService issueSequenceService;


    @Override
    public ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email) {
        IssueEntity issueEntity = null;
        try {
            boolean isExistUser = userRepository.existsById(email);
            ProjectEntity projectEntity = projectRepository.findByProjectNum(req.getProjectNum());

            if (!isExistUser) return CreateIssueResponse.notExistUser();
            if (projectEntity == null) return CreateIssueResponse.notExistProject();

            // 시퀀스 지정을 위한 최근이슈를 찾는 부분.
            IssueEntity currentIssueEntity =
                    issueRepository.findTopByProjectEntityProjectNumOrderByIssueNumDesc(req.getProjectNum());

            // 시퀀스 지정
            String sequence = "";
            if (currentIssueEntity == null) {
                sequence = issueSequenceService.initSequenceValue();  // 초기값 세팅
            } else {
                sequence = issueSequenceService.addSequenceNumber(currentIssueEntity.getIssueSequence());  // 최근 이슈+1
            }


            boolean isFirstIssue = true;
            // 최근 이슈의 ref 설정 => 새로 만들어지는 이슈를 참조 하도록 이슈의 상태를 고려해서 꼬리에 꼬리를 물어 참조할 수 있도록 한다.
            currentIssueEntity = issueRepository.findTopByProjectEntityProjectNumAndStatOrderByIssueNumDesc(req.getProjectNum(), req.getStat());

            //  상태별 이슈가 하나이상 있는 경우  => 기존에 존재하던 이슈의 ref를 새로생긴 이슈의 sequence로 세팅함.
            if (currentIssueEntity != null) {
                currentIssueEntity.setRef(sequence);
                // null이 아닌경우 새로 생기는 이슈는 맨첫 이슈가 아님.
                isFirstIssue = false;
            }

            // 1) projectNum, stat(Issue) ,  email
            //ProjectEntity projectEntity = ProjectEntity.fromRequest(req);
            UserEntity userEntity = UserEntity.fromRequest(email);
            issueEntity = IssueEntity.fromRequest(req.getStat(), userEntity, projectEntity, sequence, isFirstIssue);

            issueRepository.save(issueEntity);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreateIssueResponse.success(issueEntity);
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


    @Transactional
    @Override
    public ResponseEntity<? super ApiResponse<PatchIssueStatusResponse>> patchIssueStatus(String email, PatchIssueStatusRequest req) {
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());

            if (!isExistUser) return PatchIssueStatusResponse.notExistUser();
            else if (!isExistProject) return PatchIssueStatusResponse.notExistProject();


            IssueEntity currentIssueEntity = issueRepository.findByIssueNum(req.getIssueNum());

            if (currentIssueEntity == null) return PatchIssueStatusResponse.notExistIssue();


            // 기존 이슈와 그 이전이슈, 그리고 기존이슈의 다음 이슈의 sequence참조관계를 명확히 해야함.
            String nextIssue = currentIssueEntity.getRef(); // 다음 이슈의 sequence

            // 해당 프로젝트의 해당 상태에서 해당이슈를 Ref로 하고 있는 이슈 == 이전 이슈
            IssueEntity prevIssueEntity = null;
            boolean isFirstIssue = false;

            // 이전 이슈와 현재 이슈 참조 관계 처리
            if (nextIssue == null || nextIssue.isEmpty()) {
                // nextIssue가 없으면 이전 이슈의 참조를 비움
                prevIssueEntity =
                        issueRepository.findByProjectEntityProjectNumAndStatAndRef(req.getProjectNum(), currentIssueEntity.getStat(), currentIssueEntity.getIssueSequence());
                if (prevIssueEntity != null) {
                    prevIssueEntity.setRef(null);
                }
                //currentIssueEntity.setIsFirstIssue(false);
            } else {
                // 이전 이슈가 있을 경우, 다음 이슈의 참조를 이어주기
                prevIssueEntity =
                        issueRepository.findByProjectEntityProjectNumAndStatAndRef(req.getProjectNum(), currentIssueEntity.getStat(), currentIssueEntity.getIssueSequence());
                if (prevIssueEntity != null) {
                    prevIssueEntity.setRef(nextIssue);
                } else {
                    // 이전 이슈가 없으면 현재 이슈의 ref를 비움
                    IssueEntity nextIssueEntity = issueRepository.findByProjectEntityProjectNumAndIssueSequence(req.getProjectNum(), nextIssue);
                    if (nextIssueEntity != null) {
                        // 다음 이슈를 첫번째 이슈로 올림과 동시에 이동되는 이슈를 첫번째이슈에서 제거
                        nextIssueEntity.setIsFirstIssue(currentIssueEntity.getIsFirstIssue());
                        currentIssueEntity.setRef(null);
                    }
//                    currentIssueEntity.setIsFirstIssue(false);
                }
            }


            // ref가 null인  가장 마지막이슈의 하위 ref로 설정함.
            prevIssueEntity = issueRepository.findByProjectEntityProjectNumAndStatAndRefIsNull(req.getProjectNum(), req.getStat());
            if (prevIssueEntity != null) {
                prevIssueEntity.setRef(currentIssueEntity.getIssueSequence());
            } else {
                // 이동되는 자리에 아무런 이슈도 없는경우
                isFirstIssue = true;
            }

            // 상태 업데이트
            currentIssueEntity.setStat(req.getStat());
            // 첫번째이슈 여부 업데이트
            currentIssueEntity.setIsFirstIssue(isFirstIssue);

            // DB에 저장
            issueRepository.save(currentIssueEntity);

            if (prevIssueEntity != null) {
                issueRepository.save(prevIssueEntity); // 수정된 prevIssueEntity도 저장
            }

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


        } catch (Exception e) {
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

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueExpireDateResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<PatchIssueDetailResponse>> patchIssueDetail(String email, PatchIssueDetailRequest req) {
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());

            if (!isExistUser) return PatchIssueDetailResponse.notExistUser();
            else if (!isExistProject) return PatchIssueDetailResponse.notExistProject();

            IssueEntity issueEntity = issueRepository.findByIssueNum(req.getIssueNum());

            if (issueEntity == null) return PatchIssueDetailResponse.notExistIssue();

            issueEntity.setContent(req.getIssueDetail());

            issueRepository.save(issueEntity);

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueDetailResponse.success();
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

    @Override
    public ResponseEntity<? super ApiResponse<IssueDateTest>> getIssueTest(String email, Integer issueNum) {
        try {
//            IssueEntity issueEntity = issueRepository.findByIssueNum(issueNum);
//            List<IssueCommentEntity> cEntity = issueEntity.getIssueCommentEntities();

            List<com.persnal.teampl.entities.IssueCommentEntity> issueCommentEntities = issueRepository.queryDSLSelectIssueData(issueNum);
            System.out.println(issueCommentEntities.size());




            System.out.println("종료");


        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return null;
    }

    @Override
    public ResponseEntity<? super ApiResponse<PostIssueCommentResponse>> postIssueComment(String email, PostIssueCommentRequest req) {
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());


            if (!isExistUser) return PostIssueCommentResponse.notExistUser();
            else if (!isExistProject) return PostIssueCommentResponse.notExistProject();

            IssueEntity parentIssueEntity = issueRepository.findByIssueNum(req.getIssueNum());

            if (parentIssueEntity == null) return PostIssueCommentResponse.notExistIssue();


            int commentOrder = commentRepository.countByIssueEntityIssueNumAndCommentGroupIsNull(req.getIssueNum());


            IssueEntity issueEntity = IssueEntity.builder().issueNum(req.getIssueNum()).build();
            UserEntity userEntity = UserEntity.builder().email(email).build();


            // 전달용 객체에 세팅
            IssueCommentReq request = IssueCommentReq.builder()
                    .issueEntity(issueEntity)
                    .userEntity(userEntity)
                    .content(req.getComment())
                    .commentOrder(commentOrder)
                    .build();

            IssueCommentEntity commentEntity = com.persnal.teampl.entities.IssueCommentEntity.fromRequest(request);


            commentRepository.save(commentEntity);



        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PostIssueCommentResponse.success();
    }


    @Override
    public ResponseEntity<? super ApiResponse<GetIssueCommentListResponse>> getCommentList(String email, Integer issueNum, Integer page, Integer perPage) {
        List<IssueCommentEntity> entities = null;

        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            if (!isExistUser) return GetIssueCommentListResponse.notExistUser();

            boolean isExistIssue = issueRepository.existsById(issueNum);
            if (!isExistIssue) return GetIssueCommentListResponse.notExistIssue();

            entities = issueRepository.getIssueCommentList(issueNum, page, perPage);



        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetIssueCommentListResponse.success(entities);
    }

    @Override
    public ResponseEntity<? super ApiResponse<PatchIssueCommentResponse>> patchComment(String email, PatchIssueCommentRequest req) {
        try {
            boolean isExistUser = userRepository.existsByEmail(email);

            if (!isExistUser) return PatchIssueCommentResponse.notExistUser();

            boolean isExistIssue = issueRepository.existsById(req.getIssueNum());
            if (!isExistIssue) return PatchIssueCommentResponse.notExistIssue();

            IssueCommentEntity entity = commentRepository.findByCommentNum(req.getCommentNum());

            entity.setContent(req.getComment());

            commentRepository.save(entity);

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueCommentResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetCommentCountResponse>> getCommentCount(String email, Integer issueNum) {
        Integer count = -1;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            if (!isExistUser) return GetCommentCountResponse.notExistUser();

            boolean isExistIssue = issueRepository.existsById(issueNum);
            if (!isExistIssue) return GetCommentCountResponse.notExistIssue();

            count = commentRepository.countByIssueEntityIssueNum(issueNum);


        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetCommentCountResponse.success(count);
    }
}
