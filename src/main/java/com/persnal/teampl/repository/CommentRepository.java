package com.persnal.teampl.repository;

import com.persnal.teampl.entities.IssueCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<IssueCommentEntity, Integer> {
    int countByIssueEntityIssueNumAndCommentGroupIsNull(int issueNum);
}
