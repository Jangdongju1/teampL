package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.Enum.team.InvitationStatus;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.CreatedTeamInfo;
import com.persnal.teampl.dto.obj.TeamMemberObj;
import com.persnal.teampl.vo.invitation.InvitationInfo;
import com.persnal.teampl.dto.obj.temp.TeamInfo;
import com.persnal.teampl.dto.request.team.CreateTeamRequest;
import com.persnal.teampl.dto.request.team.InvitationMemberRequest;
import com.persnal.teampl.dto.request.team.RegistrationMemberRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.team.*;
import com.persnal.teampl.entities.TeamEntity;
import com.persnal.teampl.entities.TeamMemberEntity;
import com.persnal.teampl.repository.jpa.MemberRepository;
import com.persnal.teampl.repository.jpa.TeamRepository;
import com.persnal.teampl.repository.jpa.UserRepository;
import com.persnal.teampl.repository.resultSet.GetTeamListResultSet;
import com.persnal.teampl.service.RedisCacheService;
import com.persnal.teampl.service.TeamService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final RedisCacheService redisCacheService;

    @Override
    public ResponseEntity<? super ApiResponse<CreateTeamResponse>> createTeam(String email, CreateTeamRequest req) {
        CreatedTeamInfo info = null;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            if (!isExistUser) return CreateTeamResponse.notExistUser();

            // 팀정보 save
            TeamEntity team = TeamEntity.fromRequest(req, email);
            teamRepository.save(team);

            // 팀원정보 save
            // foreign 키로만 이루어진 테이블에 삽입을 하기위해서는 우선적으로 관계가 맺어진 부모테이블에 삽입이 우선적으로 이루어 져야함.
            TeamMemberEntity teamMember = TeamMemberEntity.fromRequest(email, team.getRegNum());
            memberRepository.save(teamMember);

            info = CreatedTeamInfo.builder()
                    .regNum(team.getRegNum())
                    .teamName(team.getTeamName())
                    .description(team.getDescription())
                    .createDate(team.getCreateDate())
                    .sequence(team.getSequence())
                    .build();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }

        return CreateTeamResponse.success(info);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetTeamListResponse>> getTeamList(String email) {
        List<GetTeamListResultSet> list = null;
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            if (!isExistUser) return GetTeamListResponse.notExistUser();

            list = teamRepository.getTeamList(email);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetTeamListResponse.success(list);
    }


    @Override
    public ResponseEntity<? super ApiResponse<GetTeamMemberResponse>> getTeamMemberList(String email, Integer regNum) {
        List<TeamMemberObj> list = null;
        try {
            boolean isExistTeam = teamRepository.existsById(regNum);

            if (!isExistTeam) return GetTeamMemberResponse.notExistTeam();

            list = memberRepository.getTeamMemberList(email, regNum);

            System.out.println(list.size());
        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetTeamMemberResponse.success(list);
    }


    @Override
    public ResponseEntity<? super ApiResponse<InvitationMemberResponse>> invitationMember(String email, InvitationMemberRequest req) {
        try {
            boolean isExistTeam = teamRepository.existsById(req.getRegNum());

            if (!isExistTeam) return InvitationMemberResponse.notExistTeam();

            // 초대를 보낸 사람에 대한 정보를 가져옴
            InvitationInfo info  = userRepository.getInvitationInfo(email, req.getRegNum());
            info.setSequence(info.getSequence().split("-")[1]);   //뒷자리 시퀀스만 세팅
            info.setInvitedDate(LocalDateTime.now().toString());
            info.setIsConfirm(InvitationStatus.ON_PROCESS.getValue());

            // 1)초대자 2) 받는사람 두 부류를 처리해주어야함.
            // 데이터 : 초대자의 초대정보  regNum , email, teamName , profileImg, invitationDate 등등.


            redisCacheService.invitationCache(info, req.getMembers());


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return InvitationMemberResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<RegistrationMemberResponse>> registrationMember(String email, RegistrationMemberRequest req) {
        TeamInfo teamInfo = null;
        try {
            TeamEntity team = teamRepository.findByRegNum(req.getRegNum());

            if (team == null) return RegistrationMemberResponse.notExistTeam();

            TeamMemberEntity member = TeamMemberEntity.fromRequest(email, req.getRegNum());

            memberRepository.save(member);

            // redis 정보 바꿔주기
            redisCacheService.registrationMemberCache(email, req);


             teamInfo = TeamInfo.builder()
                    .teamName(team.getTeamName())
                    .description(team.getDescription())
                    .sequence(team.getSequence())
                    .creator(team.getEmail())
                    .build();


        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return RegistrationMemberResponse.success(teamInfo);
    }
}
