package com.persnal.teampl.repository;

import com.persnal.teampl.entities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity,Integer> {
}
