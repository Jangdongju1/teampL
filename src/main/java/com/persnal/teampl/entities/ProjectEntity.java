package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.ProjectStat;
import com.persnal.teampl.common.Enum.ProjectType;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.util.Utils;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private Integer stat; //프로젝트의 진행상태

    @ManyToOne
    @JoinColumn(name = "email")
    private UserEntity userEntity;

    public ProjectEntity(String email, UserEntity userEntity, CreatePrjRequest req) {
        this.projectName = req.getProjectName();
        this.description = req.getDescription();
        this.userEntity = userEntity;
        this.projectType = ProjectType.PERSONAL_PROJECT.getValue();
        this.stat = ProjectStat.ON_WORKING.getValue();

        // 현재시간 세팅
        this.createDate = Utils.getNowTime(LocalDateTime.now());
    }

    public static List<ProjectObj> getProejctList(List<ProjectEntity> entities) {
        List<ProjectObj> list = new ArrayList<>();
        for (ProjectEntity entity : entities) {
            ProjectObj obj = getProjectInfo(entity);
            list.add(obj);
        }

        return list;
    }

    public static ProjectObj getProjectInfo(ProjectEntity entity){
        ProjectObj projectInfo  = new ProjectObj();

        projectInfo.setProjectNum(entity.getProjectNum());
        projectInfo.setProjectName(entity.getProjectName());
        projectInfo.setDescription(entity.getDescription());
        projectInfo.setCreateDate(entity.getCreateDate());
        projectInfo.setCreator(entity.getUserEntity().getEmail());
        projectInfo.setStat(entity.getStat());
        projectInfo.setProjectType(entity.getProjectType());
        return projectInfo;
    }
}
