package com.persnal.teampl.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reg_project")
public class ProjectEntity {
    @Id
    private int projectNum;

    @ManyToOne
    @JoinColumn(name = "regNum")
    private TeamEntity team;
    private String projectName;
    private String description;
    private String createDate;
    private boolean isDeleted;

}
