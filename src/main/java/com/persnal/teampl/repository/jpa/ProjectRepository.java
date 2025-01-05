package com.persnal.teampl.repository.jpa;

import com.persnal.teampl.dto.obj.ProjectInfoObj;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.response.project.GetPrjListPaginationResponse;
import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.repository.queryDSL.ProjectCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer>, ProjectCustomRepository {
    boolean existsByProjectNum(Integer projectNum);

    List<ProjectEntity> findByUserEntityEmailAndProjectType(String email, Integer projectType);

    ProjectEntity findByProjectNum(Integer projectNum);

    List<ProjectEntity> findAllByTeamEntityRegNum(Integer regNum);

    @Override
    List<ProjectObj> getProjectList(String email);

    @Override
    List<ProjectObj> getTeamProjectList(String email, Integer regNum);
}
