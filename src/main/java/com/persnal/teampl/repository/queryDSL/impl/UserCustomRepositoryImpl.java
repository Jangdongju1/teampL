package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.invitation.InvitationInfo;
import com.persnal.teampl.entities.QTeamEntity;
import com.persnal.teampl.entities.QUserEntity;
import com.persnal.teampl.repository.queryDSL.UserCustomRepository;
import com.persnal.teampl.util.Utils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
public class UserCustomRepositoryImpl implements UserCustomRepository {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final JPAQueryFactory queryFactory;


    @Override
    public InvitationInfo getInvitationInfo(String email, Integer retNum) {
        InvitationInfo info = null;
        try {
            QUserEntity user = QUserEntity.userEntity;
            QTeamEntity team = QTeamEntity.teamEntity;

            info = queryFactory.select(Projections.constructor(InvitationInfo.class,
                            team.regNum,
                            team.teamName,
                            team.Sequence,
                            user.email,
                            user.profileImg

                    ))
                    .from(user)
                    .innerJoin(team).on(user.email.eq(team.email)).fetchJoin()
                    .where(user.email.eq(email).and(team.regNum.eq(retNum))).fetchOne();

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return info;
    }
}
