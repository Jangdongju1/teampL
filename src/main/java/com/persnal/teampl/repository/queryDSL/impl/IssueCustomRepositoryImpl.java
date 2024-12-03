package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.entities.IssueCommentEntity;
import com.persnal.teampl.entities.QIssueCommentEntity;
import com.persnal.teampl.entities.QIssueEntity;
import com.persnal.teampl.repository.queryDSL.IssueCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class IssueCustomRepositoryImpl implements IssueCustomRepository {
    private final JPAQueryFactory query;


    @Override
    public List<IssueCommentEntity> queryDSLSelectIssueData(Integer issueNum) {
        QIssueCommentEntity qIssueCommentEntity = QIssueCommentEntity.issueCommentEntity;
        QIssueEntity qIssueEntity = QIssueEntity.issueEntity;


        return query.selectFrom(qIssueCommentEntity)
                .join(qIssueCommentEntity.issueEntity, qIssueEntity) // 조인
                .fetchJoin() // fetch join을 사용하여 Lazy 로딩을 방지
                .where(qIssueEntity.issueNum.eq(issueNum))  // issueNum 기준으로 필터링
                .fetch();  // 결과를 리스트로 반환
    }
}
