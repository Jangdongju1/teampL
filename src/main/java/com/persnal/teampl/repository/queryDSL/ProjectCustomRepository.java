package com.persnal.teampl.repository.queryDSL;

import com.persnal.teampl.dto.obj.ProjectObj;

import java.util.List;

public interface ProjectCustomRepository {
    List<ProjectObj> getProjectList(String email);
    List<ProjectObj> getTeamProjectList(String email, Integer regNum);
}
