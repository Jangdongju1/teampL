package com.persnal.teampl.repository.jpa;

import com.persnal.teampl.entities.TeamEntity;
import com.persnal.teampl.repository.resultSet.GetTeamListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRepository extends JpaRepository<TeamEntity, Integer> {

    @Query(value =
            "SELECT m.regNum, " +
                    "t.email, " +
                    "t.teamName, " +
                    "t.sequence, " +
                    "t.createDate, " +
                    "mc.members, " +
                    "COALESCE(pc.projects, 0) AS projects " +
                    "FROM team_member AS m " +
                    "INNER JOIN team as t ON m.regNum = t.regNum " +
                    "LEFT JOIN (SELECT regNum, count(*) AS members FROM team_member GROUP BY regNum) as mc ON m.regNum = mc.regNum " +
                    "LEFT JOIN (SELECT regNum ,count(projectNum) as projects FROM reg_project GROUP BY regNum) as pc ON m.regNum = pc.regNum " +
                    "WHERE m.email = ?1 " +
                    "ORDER BY t.createdate desc "
            , nativeQuery = true)
    List<GetTeamListResultSet> getTeamList(String email);


}
