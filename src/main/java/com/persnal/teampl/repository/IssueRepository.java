package com.persnal.teampl.repository;

import com.persnal.teampl.entities.IssueEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<IssueEntity, Integer> {
}
