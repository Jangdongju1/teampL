package com.persnal.teampl.repository.jpa;

import com.persnal.teampl.dto.obj.TeamMemberObj;
import com.persnal.teampl.entities.TeamMemberEntity;
import com.persnal.teampl.entities.compositeKey.TeamMemberPk;
import com.persnal.teampl.repository.queryDSL.MemberCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<TeamMemberEntity, TeamMemberPk>, MemberCustomRepository {
    @Override
    List<TeamMemberObj> getTeamMemberList(String email, Integer regNum);
}
