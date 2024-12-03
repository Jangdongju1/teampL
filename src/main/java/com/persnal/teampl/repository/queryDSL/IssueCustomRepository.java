package com.persnal.teampl.repository.queryDSL;

import com.persnal.teampl.entities.IssueCommentEntity;

import java.util.List;

public interface IssueCustomRepository {
    List<IssueCommentEntity> queryDSLSelectIssueData(Integer issueNum);
}
