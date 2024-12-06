package com.persnal.teampl.repository.queryDSL;
import com.persnal.teampl.entities.IssueCommentEntity;

import java.util.List;

public interface IssueCustomRepository {
    List<com.persnal.teampl.entities.IssueCommentEntity> queryDSLSelectIssueData(Integer issueNum);
    List<IssueCommentEntity> getIssueList (Integer issueNum);

}
