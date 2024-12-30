package com.persnal.teampl.repository.jpa;

import com.persnal.teampl.entities.TeamMemberEntity;
import com.persnal.teampl.entities.compositeKey.TeamMemberPk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<TeamMemberEntity, TeamMemberPk> {
}
