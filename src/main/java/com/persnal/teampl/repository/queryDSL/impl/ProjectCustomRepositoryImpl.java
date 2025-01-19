package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.common.Enum.issue.IssueStatus;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.entities.*;
import com.persnal.teampl.repository.queryDSL.ProjectCustomRepository;
import com.persnal.teampl.util.Utils;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RequiredArgsConstructor
public class ProjectCustomRepositoryImpl implements ProjectCustomRepository {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final JPAQueryFactory queryFactory;

    @Override
    public List<ProjectObj> getProjectList(String email) {
        List<ProjectObj> list = null;
        try {
            QProjectEntity project = QProjectEntity.projectEntity;
            QUserEntity user = QUserEntity.userEntity;
            QTeamEntity team = QTeamEntity.teamEntity;
            QIssueEntity issue = QIssueEntity.issueEntity;
            QTeamMemberEntity teamMember = QTeamMemberEntity.teamMemberEntity;


            // 서브 쿼리 적용을 위한 빌더
            BooleanBuilder condition = new BooleanBuilder();
            //개인프로젝트의 조건
            condition.or(project.userEntity.email.eq(email));

            //팀프로젝트의 조건
            condition.or(project.teamEntity.regNum.in(
                    queryFactory.select(teamMember.teamMemberPk.regNum)
                            .from(teamMember)
                            .where(teamMember.teamMemberPk.email.eq(email))
            ));


            list = queryFactory.select(Projections.constructor(ProjectObj.class,
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
                    .where(condition)
                    .orderBy(project.createDate.desc())
                    .fetch();

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }


        return list;
    }

    @Override
    public List<ProjectObj> getTeamProjectList(String email, Integer regNum) {
        List<ProjectObj> list = null;
        try {
            QProjectEntity project = QProjectEntity.projectEntity;
            QUserEntity user = QUserEntity.userEntity;
            QTeamEntity team = QTeamEntity.teamEntity;
            QIssueEntity issue = QIssueEntity.issueEntity;

            list = queryFactory.select(Projections.constructor(ProjectObj.class,
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
                    .where(team.regNum.eq(regNum))
                    .orderBy(project.createDate.desc())
                    .fetch();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }

        return list;
    }

    @Override
    public List<ProjectObj> getPersonalProjectList(String email) {
        List<ProjectObj> list = null;
        try {
            QProjectEntity project = QProjectEntity.projectEntity;

            list = queryFactory.select(Projections.constructor(ProjectObj.class,
                    project.projectNum,
                    project.teamEntity.regNum,
                    project.projectName,
                    project.description,
                    project.createDate,
                    project.userEntity.email,
                    project.stat,
                    project.projectType
                    ))
                    .from(project)
                    .where(project.userEntity.email.eq(email).and(project.teamEntity.regNum.isNull()))
                    .fetch();

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return list;
    }
}
