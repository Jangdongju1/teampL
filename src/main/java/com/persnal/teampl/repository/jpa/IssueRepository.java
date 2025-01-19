package com.persnal.teampl.repository.jpa;
import com.persnal.teampl.entities.IssueCommentEntity;
import com.persnal.teampl.entities.IssueEntity;
import com.persnal.teampl.repository.queryDSL.IssueCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueRepository extends JpaRepository<IssueEntity, Integer>, IssueCustomRepository {
    IssueEntity findTopByProjectEntityProjectNumAndStatOrderByIssueNumDesc(int projectNum, int stat);
    IssueEntity findTopByProjectEntityProjectNumOrderByIssueNumDesc(int projectNum);
    List<IssueEntity> findAllByProjectEntityProjectNum(int projectNum);
    List<IssueEntity> findAllByProjectEntityProjectNumAndStat(int projectNum, int stat);
    IssueEntity findByIssueNum(int issueNum);
    IssueEntity findByProjectEntityProjectNumAndStatAndPreviousNodeIsNull(int projectNum, int stat);
    IssueEntity findByProjectEntityProjectNumAndStatAndNextNodeIsNull(int projectNum, int stat);
    IssueEntity findByProjectEntityProjectNumAndStatAndIssueSequence(int projectNum, int stat, String nextNode);
}
