package com.persnal.teampl.repository.queryDSL;

import com.persnal.teampl.dto.obj.temp.IssueCommentFetchData;
import com.persnal.teampl.entities.IssueCommentEntity;

import java.util.List;

public interface IssueCustomRepository {
    List<com.persnal.teampl.entities.IssueCommentEntity> queryDSLSelectIssueData(Integer issueNum);
    List<IssueCommentEntity> getIssueCommentList(Integer issueNum, Integer page, Integer perPage);

}
