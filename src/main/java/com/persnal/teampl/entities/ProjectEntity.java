package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.project.ProjectStat;
import com.persnal.teampl.common.Enum.project.ProjectType;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.util.Utils;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
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

    // 빌더를 통한 객체 생성
    public static ProjectEntity fromRequest(String email, UserEntity userEntity, CreatePrjRequest req) {
        return ProjectEntity.builder()
                .projectName(req.getProjectName())
                .description(req.getDescription())
                .userEntity(userEntity)
                .projectType(ProjectType.PERSONAL_PROJECT.getValue())
                .stat(ProjectStat.ON_WORKING.getValue())
                .createDate(Utils.getNowTime(LocalDateTime.now()))
                .build();
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
