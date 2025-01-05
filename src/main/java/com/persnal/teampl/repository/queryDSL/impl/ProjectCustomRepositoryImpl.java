package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.common.Enum.issue.IssueStatus;
import com.persnal.teampl.dto.obj.ProjectInfoObj;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.response.project.GetPrjListPaginationResponse;
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
    public List<ProjectObj> getProjectList(String email) {
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

    @Override
    public List<ProjectObj> getTeamProjectList(String email, Integer regNum) {
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
                .where(user.email.eq(email).and(team.regNum.eq(regNum)))
                .orderBy(project.createDate.desc())
                .fetch();

        return list;
    }
}
