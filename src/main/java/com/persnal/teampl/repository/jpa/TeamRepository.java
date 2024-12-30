package com.persnal.teampl.repository.jpa;

import com.persnal.teampl.entities.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<TeamEntity, Integer> {

}
