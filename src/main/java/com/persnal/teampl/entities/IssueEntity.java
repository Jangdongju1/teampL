package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.issue.IssueCategory;
import com.persnal.teampl.common.Enum.issue.IssuePriority;
import com.persnal.teampl.dto.obj.IssueInfoObj;
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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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
                .nextNode(req.getNextNode())
                .previousNode(null)
                .build();
    }


//    public static List<IssueInfoObj> getList(List<IssueEntity> entities) {
//        List<IssueInfoObj> list = new ArrayList<>();
//        for (IssueEntity entity : entities) {
//            IssueInfoObj listElement = IssueInfoObj.builder()
//                    .issueNum(entity.getIssueNum())
//                    .projectNum(entity.getProjectEntity().getProjectNum())
//                    .email(entity.getUserEntity().getEmail())
//                    .title(entity.getTitle())
//                    .content(entity.getContent())
//                    .inCharge(entity.getInCharge())
//                    .priority(entity.getPriority())
//                    .writeDate(entity.getWriteDate())
//                    .expireDate(entity.getExpireDate())
//                    .stat(entity.getStat())
//                    .category(entity.getCategory())
//                    .issueSequence(entity.getIssueSequence())
//                    .previousNode(entity.getPreviousNode())
//                    .nextNode(entity.getNextNode())
//                    .build();
//            list.add(listElement);
//        }
//        return list;
//    }

    public static IssueInfoObj getIssue(IssueEntity entity) {
        return IssueInfoObj.builder()
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
                .nextNode(entity.getNextNode())
                .build();
    }


}
