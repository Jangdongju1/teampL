package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.project.ProjectStat;
import com.persnal.teampl.common.Enum.project.ProjectType;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.request.project.CreatePrjRequest;
import com.persnal.teampl.dto.request.project.CreateTeamPrjRequest;
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


    public static ProjectEntity fromRequest(String email, CreateTeamPrjRequest req) {
        LocalDateTime now = LocalDateTime.now();

        TeamEntity teamEntity = TeamEntity.builder()
                .regNum(req.getRegNum())
                .build();

        UserEntity userEntity = UserEntity.builder()
                .email(email)
                .build();

        return ProjectEntity.builder()
                .projectName(req.getProjectName())
                .teamEntity(teamEntity)
                .userEntity(userEntity)
                .description(req.getDescription())
                .createDate(now.toString())
                .projectType(ProjectType.TEAM_PROJECT.getValue())
                .stat(ProjectStat.ON_WORKING.getValue())
                .isDeleted(false)
                .build();
    }


    public static List<ProjectObj> getProjectList(List<ProjectEntity> entities) {
        List<ProjectObj> list = new ArrayList<>();
        for (ProjectEntity entity : entities) {
            ProjectObj obj = getProjectInfo(entity);
            list.add(obj);
        }

        return list;
    }

    public static ProjectObj getProjectInfo(ProjectEntity entity){
        // 개인프로젝트의 경우 teamEntity가 null일 수 있으므로 null에 대한 처리를 해줘야 함.
        TeamEntity teamEntity = entity.getTeamEntity();
        return ProjectObj.builder()
                .projectNum(entity.getProjectNum())
                .projectName(entity.getProjectName())
                .description(entity.getDescription())
                .createDate(entity.getCreateDate())
                .creator(entity.getUserEntity().getEmail())
                .stat(entity.getStat())
                .projectType(entity.getProjectType())
                .regNum(teamEntity == null? null : teamEntity.getRegNum())
                .build();
    }
}
