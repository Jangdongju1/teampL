package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.TeamMemberObj;
import com.persnal.teampl.entities.QTeamEntity;
import com.persnal.teampl.entities.QTeamMemberEntity;
import com.persnal.teampl.entities.QUserEntity;
import com.persnal.teampl.repository.queryDSL.MemberCustomRepository;
import com.persnal.teampl.util.Utils;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RequiredArgsConstructor
public class MemberCustomRepositoryImpl implements MemberCustomRepository {
    private final JPAQueryFactory queryFactory;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Override
    public List<TeamMemberObj> getTeamMemberList(String email, Integer regNum) {
        List<TeamMemberObj> list = null;
        try {
            QUserEntity user = QUserEntity.userEntity;
            QTeamEntity team = QTeamEntity.teamEntity;
            QTeamMemberEntity teamMember = QTeamMemberEntity.teamMemberEntity;

//
//            list = queryFactory.select(Projections.constructor(TeamMemberObj.class,
//                            teamMember.teamMemberPk,
//                            user.email,
//                            user.profileImg,
//                            team.teamName
//                    ))
//                    .from(teamMember)
//                    .innerJoin(user).on(teamMemberPk.email.eq(user.email))
//                    .innerJoin(team).on(teamMemberPk.regNum.eq(team.regNum))
//                    .fetchJoin()
//                    .where(teamMemberPk.regNum.eq(regNum))
//                    .fetch();

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return list;
    }
}
