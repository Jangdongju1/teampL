package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.common.Enum.issue.IssueStatus;
import com.persnal.teampl.dto.obj.ProjectInfoObj;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.entities.*;
import com.persnal.teampl.repository.queryDSL.ProjectCustomRepository;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.JPAExpressions;
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

    @Override
    public List<ProjectObj> getTProjectList(String email) {
        QProjectEntity project = QProjectEntity.projectEntity;
        QUserEntity user = QUserEntity.userEntity;
        QTeamEntity team = QTeamEntity.teamEntity;
        QIssueEntity issue = QIssueEntity.issueEntity;

        List<ProjectObj> list = queryFactory.select(Projections.constructor(ProjectObj.class,
                        project.projectNum,
                        project.teamEntity.regNum,
                        project.projectName,
                        project.description,
                        project.createDate,
                        user.email,
                        project.stat,
                        project.projectType,
                        team.teamName,
                        // 서브쿼리
                        JPAExpressions.select(issue.issueNum.count().as("totalIssueCnt"))
                                .from(issue)
                                .where(issue.projectEntity.projectNum.eq(project.projectNum))
                        ,
                        JPAExpressions.select(issue.issueNum.count().as("processed"))
                                .from(issue)
                                .where(issue.projectEntity.projectNum.eq(project.projectNum).and(issue.stat.eq(IssueStatus.DONE.getValue())))

                )).from(project)
                .innerJoin(user).on(project.userEntity.email.eq(user.email))
                .leftJoin(team).on(project.teamEntity.regNum.eq(team.regNum)).fetchJoin()
                .where(user.email.eq(email))

                .orderBy(project.createDate.desc())



                .fetch();


        return list;

    }
}
