package com.persnal.teampl.repository;
import com.persnal.teampl.entities.IssueEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueRepository extends JpaRepository<IssueEntity, Integer> {
    IssueEntity findTopByProjectEntityProjectNumAndStatOrderByIssueNumDesc(int projectNum, int stat);
    IssueEntity findTopByProjectEntityProjectNumOrderByIssueNumDesc(int projectNum);
    List<IssueEntity> findAllByProjectEntityProjectNum(int projectNum);
    List<IssueEntity> findAllByProjectEntityProjectNumAndStat(int projectNum, int stat);
    IssueEntity findByIssueNum(int issueNum);
}
