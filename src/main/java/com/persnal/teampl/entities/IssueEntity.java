package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.issue.IssueCategory;
import com.persnal.teampl.common.Enum.issue.IssuePriority;
import com.persnal.teampl.dto.obj.IssueObj;
import com.persnal.teampl.dto.obj.temp.CreateIssueTempDto;
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
    private String issueSequence;
    @Setter
    private String previousNode;
    @Setter
    private String nextNode;


    @Setter
    private Boolean isDeleted;


    @OneToMany(mappedBy = "issueEntity", fetch = FetchType.LAZY)
    List<IssueCommentEntity> issueCommentEntities;

    public static IssueEntity fromRequest(CreateIssueTempDto req) {
        return IssueEntity.builder()
                .title("제목을 지정해 주세요.")  // 기본 값
                .content("")
                .inCharge("") //
                .stat(req.getIssueStat())
                .priority(IssuePriority.NORMAL.getValue())
                .category(IssueCategory.ETC.getValue())
                .userEntity(req.getUserEntity())
                .projectEntity(req.getProjectEntity())
                .writeDate(Utils.getNowTime(LocalDateTime.now()))
                .expireDate(null)
                .isDeleted(false)
                .issueSequence(req.getIssueSequence())
                .previousNode(req.getPreviousNode())
                .nextNode(null) //기본값
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
                    .previousNode(entity.getPreviousNode())
                    .nextNode(entity.getNextNode())
                    .build();
            list.add(listElement);
        }
        return list;
    }

    public static IssueObj getIssue(IssueEntity entity) {
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
              //  .ref(entity.getRef())
                //.isFirstIssue(entity.getIsFirstIssue())
                .build();
    }


}
