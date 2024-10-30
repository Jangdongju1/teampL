package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.ProjectType;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.request.project.CreateProjectRequest;
import com.persnal.teampl.util.Utils;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reg_project")
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectNum;

    @ManyToOne
    @JoinColumn(name = "regNum")
    private TeamEntity teamEntity;
    private String projectName;
    private String description;
    private String createDate;
    private boolean isDeleted;
    private Integer projectType;
    // private String email;

    @ManyToOne
    @JoinColumn(name = "email")
    private UserEntity userEntity;

    public ProjectEntity(String email, UserEntity userEntity, CreateProjectRequest req) {
        this.projectName = req.getProjectName();
        this.description = req.getDescription();
        this.userEntity = userEntity;
        this.projectType = ProjectType.PERSONAL_PROJECT.getValue();

        // 현재시간 세팅
        this.createDate = Utils.getNowTime(LocalDateTime.now());
    }

    public static List<ProjectObj> getProejctList(List<ProjectEntity> entities) {
        List<ProjectObj> list = new ArrayList<>();
        for (ProjectEntity entity : entities) {
            ProjectObj obj = new ProjectObj();

            obj.setProjectNum(entity.getProjectNum());
            obj.setProjectName(entity.getProjectName());
            obj.setDescription(entity.getDescription());
            obj.setCreateDate(entity.getCreateDate());
            obj.setCreator(entity.getUserEntity().getEmail());

            list.add(obj);
        }


        return list;
    }
}
