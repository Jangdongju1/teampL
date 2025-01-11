package com.persnal.teampl.repository.queryDSL;

import com.persnal.teampl.dto.obj.TeamMemberObj;

import java.util.List;

public interface MemberCustomRepository {
    List<TeamMemberObj> getTeamMemberList(String email, Integer regNum);
}
