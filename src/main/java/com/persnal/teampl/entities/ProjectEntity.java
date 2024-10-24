package com.persnal.teampl.entities;

import com.persnal.teampl.dto.request.project.CreateProjectRequest;
import com.persnal.teampl.util.Utils;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reg_project")
public class ProjectEntity {
    @Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectNum;

    @ManyToOne
    @JoinColumn(name = "regNum")
    private TeamEntity team;
    private String projectName;
    private String description;
    private String createDate;
    private boolean isDeleted;
   // private String email;

    @ManyToOne
    @JoinColumn(name = "email")
    private UserEntity userEntity;

    public ProjectEntity(String email, UserEntity userEntity,TeamEntity teamEntity, CreateProjectRequest req) {
        this.projectName = req.getProjectName();
        this.description = req.getDescription();
        this.userEntity = userEntity;
        this.team = teamEntity;
        // 현재시간 세팅
        this.createDate = Utils.getNowTime(LocalDateTime.now());
    }
}
