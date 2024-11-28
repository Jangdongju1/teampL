package com.persnal.teampl.repository;

import com.persnal.teampl.entities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity,Integer> {
    boolean existsByProjectNum(Integer projectNum);
    List<ProjectEntity> findByUserEntityEmailAndProjectType(String email, Integer projectType);
    ProjectEntity findByProjectNum(Integer projectNum);
}
