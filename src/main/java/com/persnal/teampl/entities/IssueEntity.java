package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.issue.IssueCategory;
import com.persnal.teampl.common.Enum.issue.IssuePriority;
import com.persnal.teampl.dto.obj.IssueObj;
import com.persnal.teampl.util.Utils;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "issue")
@Builder
public class IssueEntity {
    @Id
    private int issueNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "projectNum")
    private ProjectEntity projectEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private UserEntity userEntity;

    @Setter
    private String title;
    @Setter
    private String content;
    @Setter
    private String inCharge;
    @Setter
    private Integer priority;
    private String writeDate;
    @Setter
    private String expireDate;
    @Setter
    private Integer stat;
    @Setter
    private Integer category;
    @Setter
    private Boolean isDeleted;
//    @Setter
//    private Boolean isAssigned;
    @Setter
    private String issueSequence;
    @Setter
    private String ref;
    @Setter
    private Boolean isFirstIssue;

    @OneToMany(mappedBy = "issueEntity", fetch = FetchType.LAZY)
    List<IssueCommentEntity> issueCommentEntities;

    public static IssueEntity fromRequest(Integer stat, UserEntity userEntity, ProjectEntity projectEntity, String sequence, boolean isFirstIssue) {
        return IssueEntity.builder()
                .title("제목을 지정해 주세요.")  // 기본 값
                .content("")
                .inCharge("") //
                .stat(stat)
                .priority(IssuePriority.NORMAL.getValue())
                .category(IssueCategory.ETC.getValue())
                .userEntity(userEntity)
                .projectEntity(projectEntity)
                .writeDate(Utils.getNowTime(LocalDateTime.now()))
                .expireDate(null)
                .isDeleted(false)
                .issueSequence(sequence)
                .isFirstIssue(isFirstIssue)
                .build();
    }


    public static List<IssueObj> getList(List<IssueEntity> entities) {
        List<IssueObj> list = new ArrayList<>();
        for (IssueEntity entity : entities) {
            IssueObj listElement = IssueObj.builder()
                    .issueNum(entity.getIssueNum())
                    .projectNum(entity.getProjectEntity().getProjectNum())
                    .email(entity.getUserEntity().getEmail())
                    .title(entity.getTitle())
                    .content(entity.getContent())
                    .inCharge(entity.getInCharge())
                    .priority(entity.getPriority())
                    .writeDate(entity.getWriteDate())
                    .expireDate(entity.getExpireDate())
                    .stat(entity.getStat())
                    .category(entity.getCategory())
                    .issueSequence(entity.getIssueSequence())
                    .ref(entity.getRef())
                    .isFirstIssue(entity.getIsFirstIssue())
                    .build();
            list.add(listElement);
        }
        return list;
    }

    public static IssueObj getIssue(IssueEntity entity){
        return IssueObj.builder()
                .issueNum(entity.getIssueNum())
                .projectNum(entity.getProjectEntity().getProjectNum())
                .email(entity.getUserEntity().getEmail())
                .title(entity.getTitle())
                .content(entity.getContent())
                .inCharge(entity.getInCharge())
                .priority(entity.getPriority())
                .writeDate(entity.getWriteDate())
                .expireDate(entity.getExpireDate())
                .stat(entity.getStat())
                .category(entity.getCategory())
                .issueSequence(entity.getIssueSequence())
                .ref(entity.getRef())
                .isFirstIssue(entity.getIsFirstIssue())
                .build();
    }


}
