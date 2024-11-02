package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.issue.IssuePriority;
import com.persnal.teampl.dto.request.issue.CreateIssueRequest;
import com.persnal.teampl.util.Utils;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "issue")
@Builder
public class IssueEntity {
    @Id
    private int issueNum;
    @ManyToOne
    @JoinColumn(name = "projectNum")
    private ProjectEntity projectEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private UserEntity userEntity;

    private String title;
    @Setter
    private String content;
    @Setter
    private String inCharge;
    @Setter
    private int priority;
    private String writeDate;
    @Setter
    private String expireDate;
    @Setter
    private int stat;
    @Setter
    private int category;
    @Setter
    private boolean isDeleted;
    //
    private String issueSequence;
    private String ref;

    @OneToMany(mappedBy = "issueEntity", fetch = FetchType.LAZY)
    Set<IssueCommentEntity> issueCommentEntities;

    public static IssueEntity fromRequest(Integer stat, UserEntity userEntity, ProjectEntity projectEntity){
        return IssueEntity.builder()
                .stat(stat)
                .userEntity(userEntity)
                .projectEntity(projectEntity)
                .writeDate(Utils.getNowTime(LocalDateTime.now()))
                .priority(IssuePriority.NORMAL.getValue())
                .isDeleted(false)
                .issueSequence("KANBAN_1")  // 테스트
                .build();
    }


}
