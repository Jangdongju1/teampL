package com.persnal.teampl.repository.queryDSL;

import com.persnal.teampl.dto.obj.ProjectInfoObj;
import com.persnal.teampl.dto.obj.ProjectObj;

import java.util.List;

public interface ProjectCustomRepository {
    List<ProjectInfoObj> getProjectList(String email);
    List<ProjectObj>getTProjectList(String email);
}
