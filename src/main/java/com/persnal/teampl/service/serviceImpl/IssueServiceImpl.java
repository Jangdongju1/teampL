package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.IssueCommentReq;
import com.persnal.teampl.dto.obj.temp.CreateIssueTempDto;
import com.persnal.teampl.dto.obj.temp.PatchIssueTitleRepObj;
import com.persnal.teampl.dto.obj.temp.TeamIssueInfoFetchData;
import com.persnal.teampl.dto.request.issue.*;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.issue.*;
import com.persnal.teampl.entities.IssueCommentEntity;
import com.persnal.teampl.entities.IssueEntity;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.jpa.*;
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
    private final TeamRepository teamRepository;


    @Override
    @Transactional
    public ResponseEntity<? super ApiResponse<CreateIssueResponse>> createIssue(CreateIssueRequest req, String email) {
        IssueEntity issueEntity = null;
        try {
            boolean isExistUser = userRepository.existsById(email);
            if (!isExistUser) return CreateIssueResponse.notExistUser();

            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());
            if (!isExistProject) return CreateIssueResponse.notExistProject();

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


            String nextNode = null;
            // state별 가장 마지막 이슈 찾기.
            currentIssueEntity =
                    issueRepository.findByProjectEntityProjectNumAndStatAndPreviousNodeIsNull(req.getProjectNum(), req.getStat());

            if (currentIssueEntity != null) {
                // 이전 이슈가 존재하는 경우
                nextNode = currentIssueEntity.getIssueSequence();
                currentIssueEntity.setPreviousNode(sequence); // 이전이 슈의 이전노드를 추가되는 노드로
                //  currentIssueEntity.setNextNode(sequence);  // 이전 이슈의 다음노드 == 추가되는 이슈의 시퀀스
                //previousNode = currentIssueEntity.getIssueSequence();
            }


            UserEntity userEntity = UserEntity.builder().email(email).build();
            ProjectEntity projectEntity = ProjectEntity.builder().projectNum(req.getProjectNum()).build();

            CreateIssueTempDto dto =
                    CreateIssueTempDto.builder()
                            .issueStat(req.getStat())
                            .projectEntity(projectEntity)
                            .userEntity(userEntity)
                            .issueSequence(sequence)
                            .nextNode(nextNode)
                            .build();


            issueEntity = IssueEntity.fromRequest(dto);

            issueRepository.save(issueEntity);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return CreateIssueResponse.success(issueEntity);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueList(String email, Integer projectNum) {
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
    public ResponseEntity<? super ApiResponse<GetPersonalIssueListResponse>> getPersonalIssueListByStatus(String email, Integer projectNum, Integer status) {
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
        PatchIssueTitleRepObj repData = null;
        try {
            boolean isExistUser = userRepository.existsById(Email);
            boolean isExistProject = projectRepository.existsByProjectNum(req.getProjectNum());


            if (!isExistUser) return PatchIssueTitleResponse.notExistUser();
            else if (!isExistProject) return PatchIssueTitleResponse.notExistProject();

            IssueEntity issueEntity = issueRepository.findByIssueNum(req.getIssueNum());
            if (issueEntity == null) return PatchIssueTitleResponse.notExistIssue();

            repData = PatchIssueTitleRepObj.builder()
                    .projectNum(req.getProjectNum())
                    .issueNum(req.getIssueNum())
                    .stat(issueEntity.getStat())
                    .changedTitle(req.getTitle())
                    .build();


            issueEntity.setTitle(req.getTitle());
            issueRepository.save(issueEntity);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueTitleResponse.success(repData);
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
            boolean isExistUser = userRepository.existsById(email);
            if (!isExistUser) return PatchIssueStatusResponse.notExistUser();

            boolean isExistIssue = issueRepository.existsById(req.getIssueNum());
            if (!isExistIssue) return PatchIssueStatusResponse.notExistIssue();

            IssueEntity issueEntity = issueRepository.findByIssueNum(req.getIssueNum());  // 이동 대상의 이슈


            //srcBoard처리
            String previousNode = issueEntity.getPreviousNode();
            String nextNode = issueEntity.getNextNode();

            IssueEntity preEntity = null;
            IssueEntity nextEntity = null;

            // pre만 존재하는경우 둘다 존재하는경우  next만 존재하는 경우


            if (previousNode != null) {
                preEntity =
                        issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), issueEntity.getStat(), previousNode);
                // 1) pre, next 둘다 존재했던 경우
                if (nextNode != null) {
                    nextEntity = issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), issueEntity.getStat(), nextNode);
                    nextEntity.setPreviousNode(preEntity.getIssueSequence());
                    preEntity.setNextNode(nextEntity.getIssueSequence());
                } else {
                    // 2) pre만 존재하는 경우,
                    preEntity.setNextNode(null);
                }


            } else {
                // next 만 존재하는 경우
                if (nextNode != null) {
                    nextEntity = issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), issueEntity.getStat(), nextNode);
                    nextEntity.setPreviousNode(null);
                }
                // 둘다 존재하지 아니하는 경우 아무것도 안하지
            }


            // dstboard 처리
            // previous Node가 null이면 제일 첫번쩨 노드이다.

            IssueEntity currentIssueEntity = null;

            currentIssueEntity =  // dst보드의 가장 첫번재 이슈
                    issueRepository.findByProjectEntityProjectNumAndStatAndPreviousNodeIsNull(req.getProjectNum(), req.getStat());

            if (currentIssueEntity != null) {
                // 가장 최근 이슈가 있는 경우
                currentIssueEntity.setPreviousNode(issueEntity.getIssueSequence());
                issueEntity.setNextNode(currentIssueEntity.getIssueSequence());
                issueEntity.setPreviousNode(null);
            } else {
                issueEntity.setPreviousNode(null);
                issueEntity.setNextNode(null);
            }

            // 처리된 srcBoard저장.
            if (nextNode != null) issueRepository.save(nextEntity);
            if (previousNode != null) issueRepository.save(preEntity);

            issueEntity.setStat(req.getStat());
            issueRepository.save(issueEntity);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueStatusResponse.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super ApiResponse<PatchIssueStatusDragResponse>> patchIssueStatusDrag(String email, PatchIssueStatusDragRequest req) {
        try {
            boolean isExistUser = userRepository.existsById(email);
            if (!isExistUser) return PatchIssueStatusDragResponse.notExistUser();

            IssueEntity currentIssueEntity = issueRepository.findByIssueNum(req.getIssueNum());
            if (currentIssueEntity == null) return PatchIssueStatusDragResponse.notExistIssue();

            // srcBoard 처리
            String preNode = currentIssueEntity.getPreviousNode();
            String nextNode = currentIssueEntity.getNextNode();

            IssueEntity srcPreEntity = null;
            IssueEntity srcNextEntity = null;

            if (preNode != null) {
                srcPreEntity =
                        issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), currentIssueEntity.getStat(), preNode);

                if (nextNode != null) {
                    // src에 preNode와 nextNode가 모두 존재하는 경우
                    srcNextEntity = issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), currentIssueEntity.getStat(), nextNode);
                    srcPreEntity.setNextNode(srcNextEntity.getIssueSequence());
                    srcNextEntity.setPreviousNode(srcPreEntity.getIssueSequence());
                } else {
                    //preNode만 존재 하는 경우
                    srcPreEntity.setNextNode(null);
                }
            } else {
                if (nextNode != null) {
                    // next Node만 존재하는 경우
                    srcNextEntity =
                            issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), currentIssueEntity.getStat(), nextNode);
                    srcNextEntity.setPreviousNode(null);
                }
            }


            // dstBoard에 대한 처리.
            preNode = req.getDstPreNode();
            nextNode = req.getDstNextNode();

            IssueEntity dstPreEntity = null;
            IssueEntity dstNextEntity = null;

            if (preNode != null) {
                dstPreEntity =
                        issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), req.getDstStat(), preNode);

                if (nextNode != null) {
                    // 옮겨지는 위치에 preNode 와 nextNode 둘다 존재하는 경우 노드 연결
                    dstNextEntity = issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), req.getDstStat(), nextNode);

                    // 가운데 끼워 넣고 연결
                    dstPreEntity.setNextNode(currentIssueEntity.getIssueSequence());
                    currentIssueEntity.setPreviousNode(dstPreEntity.getIssueSequence());
                    currentIssueEntity.setNextNode(dstNextEntity.getIssueSequence());
                    dstNextEntity.setPreviousNode(currentIssueEntity.getIssueSequence());
                } else {
                    dstPreEntity.setNextNode(currentIssueEntity.getIssueSequence());
                    currentIssueEntity.setNextNode(null);
                    currentIssueEntity.setPreviousNode(dstPreEntity.getIssueSequence());
                }

            } else {
                if (nextNode != null) {
                    dstNextEntity = issueRepository.findByProjectEntityProjectNumAndStatAndIssueSequence(req.getProjectNum(), req.getDstStat(), nextNode);
                    currentIssueEntity.setPreviousNode(null);
                    currentIssueEntity.setNextNode(dstNextEntity.getIssueSequence());
                    dstNextEntity.setPreviousNode(currentIssueEntity.getIssueSequence());
                } else {
                    // 둘다 존재하지 않는 경우
                    currentIssueEntity.setPreviousNode(null);
                    currentIssueEntity.setNextNode(null);
                }
            }


            // 상태값 세팅
            currentIssueEntity.setStat(req.getDstStat());
            // 각각의 변경된 이슈 저장.
            if (srcPreEntity != null) issueRepository.save(srcPreEntity);
            if (srcNextEntity != null) issueRepository.save(srcNextEntity);
            if (dstPreEntity != null) issueRepository.save(dstPreEntity);
            if (dstNextEntity != null) issueRepository.save(dstNextEntity);

            issueRepository.save(currentIssueEntity);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueStatusDragResponse.success();
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

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueDetailResponse.success();
    }

    // 수정해야함 팀이름까지 같이 가져와야함.
    @Override
    public ResponseEntity<? super ApiResponse<GetPersonalIssueInfoResponse>> getPersonalIssueInfo(String email, Integer issueNum) {
        IssueEntity issueEntity = null;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);

            if (!isExistUser) return GetPersonalIssueInfoResponse.notExistUser();

            issueEntity = issueRepository.findByIssueNum(issueNum);

            if (issueEntity == null) return GetPersonalIssueInfoResponse.notExistIssue();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetPersonalIssueInfoResponse.success(issueEntity);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetTeamIssueInfoResponse>> getTeamIssueInfo(String email, Integer issueNum, Integer regNum) {
        TeamIssueInfoFetchData data = null;
        try {
            boolean isExistProject = teamRepository.existsById(regNum);

            if (!isExistProject) return GetTeamIssueInfoResponse.notExistTeam();

            boolean isExistIssue = issueRepository.existsById(issueNum);

            if (!isExistIssue) return GetTeamIssueInfoResponse.notExistIssue();

            data = issueRepository.getTeamIssueInfo(issueNum, regNum);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetTeamIssueInfoResponse.success(data);
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


        } catch (Exception e) {
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


        } catch (Exception e) {
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

        } catch (Exception e) {
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


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetCommentCountResponse.success(count);
    }

    @Override
    public ResponseEntity<? super ApiResponse<PatchIssueInChargeResponse>> patchIssueInCharge(PatchIssueInChargeRequest req) {
        try {
            IssueEntity currentIssue = issueRepository.findByIssueNum(req.getIssueNum());

            if (currentIssue == null) return PatchIssueInChargeResponse.notExistIssue();

            currentIssue.setInCharge(req.getInCharge());

            issueRepository.save(currentIssue);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchIssueInChargeResponse.success();
    }
}
