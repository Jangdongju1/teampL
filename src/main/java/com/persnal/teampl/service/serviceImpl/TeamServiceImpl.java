package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.CreatedTeamInfo;
import com.persnal.teampl.dto.request.team.CreateTeamRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.team.CreateTeamResponse;
import com.persnal.teampl.dto.response.team.GetTeamListResponse;
import com.persnal.teampl.entities.TeamEntity;
import com.persnal.teampl.entities.TeamMemberEntity;
import com.persnal.teampl.repository.jpa.MemberRepository;
import com.persnal.teampl.repository.jpa.TeamRepository;
import com.persnal.teampl.repository.jpa.UserRepository;
import com.persnal.teampl.repository.resultSet.GetTeamListResultSet;
import com.persnal.teampl.service.TeamService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;


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
}
