package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.dto.obj.ProjectInfoObj;
import com.persnal.teampl.entities.QProjectEntity;
import com.persnal.teampl.entities.QTeamEntity;
import com.persnal.teampl.entities.QUserEntity;
import com.persnal.teampl.repository.queryDSL.ProjectCustomRepository;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ProjectCustomRepositoryImpl implements ProjectCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ProjectInfoObj> getProjectList(String email) {
        QTeamEntity teamEntity = QTeamEntity.teamEntity;
        QUserEntity userEntity = QUserEntity.userEntity;
        QProjectEntity projectEntity = QProjectEntity.projectEntity;

        // Projections.constructor는 DTO를 바로 새성하면서 값을 넣을 수 있게 해준다 QueryDsl의 기능임.
        List<ProjectInfoObj> result =
                queryFactory.select(Projections.constructor(ProjectInfoObj.class,
                                projectEntity.projectNum,
                                projectEntity.projectName,
                                projectEntity.userEntity.email,
                                projectEntity.projectType,
                                projectEntity.stat,
                                teamEntity.teamName))
                        .from(teamEntity)
                        .innerJoin(userEntity).on(teamEntity.email.eq(userEntity.email))
                        .rightJoin(projectEntity).on(teamEntity.regNum.eq(projectEntity.teamEntity.regNum))
                        .fetchJoin()
                        .where(userEntity.email.eq(email)
                                .or(projectEntity.projectType.eq(0).and(projectEntity.userEntity.email.eq(email))))
                        .fetch();





        return result;
    }
}
