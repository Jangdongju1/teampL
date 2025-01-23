package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.IssueInfoObj;
import com.persnal.teampl.dto.obj.IssueListElementObj;
import com.persnal.teampl.dto.obj.TeamMemberObj;
import com.persnal.teampl.dto.obj.temp.TeamIssueInfoFetchData;
import com.persnal.teampl.entities.*;
import com.persnal.teampl.repository.queryDSL.IssueCustomRepository;
import com.persnal.teampl.util.Utils;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RequiredArgsConstructor
public class IssueCustomRepositoryImpl implements IssueCustomRepository {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final JPAQueryFactory query;

    @Override
    public List<IssueCommentEntity> getIssueCommentList(Integer issueNum, Integer page, Integer perPage) {
        List<IssueCommentEntity> data = null;
        try {
            QUserEntity userEntity = QUserEntity.userEntity;
            QIssueCommentEntity commentEntity = QIssueCommentEntity.issueCommentEntity;

            data = query.select(commentEntity)
                    .from(commentEntity)
                    .join(commentEntity.userEntity, userEntity).fetchJoin()
                    .where(commentEntity.issueEntity.issueNum.eq(issueNum))
                    .orderBy(commentEntity.commentOrder.desc())
                    .limit(perPage)
                    .offset((long) (page - 1) * perPage)  // 계산법 다시한번 생각해 보기
                    .fetch();

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return data;
    }

    @Override
    public TeamIssueInfoFetchData getTeamIssueInfo(Integer issueNum, Integer regNum) {
        TeamIssueInfoFetchData data = null;
        try {
            QIssueEntity issue = QIssueEntity.issueEntity;
            QProjectEntity project = QProjectEntity.projectEntity;
            QUserEntity user = QUserEntity.userEntity;
            QTeamMemberEntity teamMember = QTeamMemberEntity.teamMemberEntity;
            QTeamEntity team = QTeamEntity.teamEntity;


            List<Tuple> issueResult = query.select(
                            issue.issueNum,
                            issue.projectEntity.projectNum,
                            issue.userEntity.email,
                            issue.title,
                            issue.content,
                            issue.inCharge,
                            issue.priority,
                            issue.writeDate,
                            issue.expireDate,
                            issue.stat,
                            issue.category,
                            issue.issueSequence,
                            issue.previousNode,
                            issue.nextNode,
                            team.teamName)
                    .from(issue)
                    .innerJoin(project).on(issue.projectEntity.projectNum.eq(project.projectNum))
                    .innerJoin(team).on(project.teamEntity.regNum.eq(team.regNum))
                    .fetchJoin()
                    .where(issue.issueNum.eq(issueNum))
                    .fetch();

            IssueInfoObj issueData = IssueInfoObj.builder()
                    .issueNum(issueResult.get(0).get(issue.issueNum))
                    .projectNum(issueResult.get(0).get(issue.projectEntity.projectNum))
                    .email(issueResult.get(0).get(issue.userEntity.email))
                    .title(issueResult.get(0).get(issue.title))
                    .content(issueResult.get(0).get(issue.content))
                    .inCharge(issueResult.get(0).get(issue.inCharge))
                    .priority(issueResult.get(0).get(issue.priority))
                    .writeDate(issueResult.get(0).get(issue.writeDate))
                    .expireDate(issueResult.get(0).get(issue.expireDate))
                    .stat(issueResult.get(0).get(issue.stat))
                    .category(issueResult.get(0).get(issue.category))
                    .issueSequence(issueResult.get(0).get(issue.issueSequence))
                    .previousNode(issueResult.get(0).get(issue.previousNode))
                    .nextNode(issueResult.get(0).get(issue.nextNode))
                    .teamName(issueResult.get(0).get(team.teamName))
                    .build();


            BooleanBuilder condition = new BooleanBuilder();

            // 뒤쪽의 서브쿼리
            condition.and(user.email.in(query.select(teamMember.teamMemberPk.email)
                    .from(teamMember)
                    .where(teamMember.teamMemberPk.regNum.eq(regNum))));


            List<TeamMemberObj> memberData =
                    query.select(Projections.constructor(
                                    TeamMemberObj.class,
                                    user.email,
                                    user.profileImg,
                                    user.nickname))
                            .from(user)
                            .where(condition)
                            .fetch();


            data = new TeamIssueInfoFetchData();
            data.setIssue(issueData);
            data.setMembers(memberData);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return data;
    }


    @Override
    public List<IssueListElementObj> getIssueList(Integer projectNum) {
        List<IssueListElementObj> list = null;
        try {
            QIssueEntity issues = QIssueEntity.issueEntity;
            QIssueCommentEntity comments = QIssueCommentEntity.issueCommentEntity;

            list = query.select(Projections.constructor(IssueListElementObj.class,
                            issues.issueNum,
                            issues.projectEntity.projectNum,
                            issues.userEntity.email,
                            issues.title,
                            issues.content,
                            issues.inCharge,
                            issues.priority,
                            issues.writeDate,
                            issues.expireDate,
                            issues.stat,
                            issues.category,
                            issues.issueSequence,
                            issues.previousNode,
                            issues.nextNode,
                            comments.commentNum.count().as("commentCnt")
                    ))
                    .from(issues)
                    .leftJoin(comments).on(issues.issueNum.eq(comments.issueEntity.issueNum))
                    .fetchJoin()
                    .where(issues.projectEntity.projectNum.eq(projectNum))
                    .groupBy(issues.issueNum)
                    .fetch();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));

        }
        return list;
    }
}
