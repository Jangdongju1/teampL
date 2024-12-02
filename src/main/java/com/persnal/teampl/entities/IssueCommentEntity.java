package com.persnal.teampl.entities;

import com.persnal.teampl.dto.obj.IssueCommentReq;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "issue_comment")
public class IssueCommentEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentNum;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issueNum")
    private IssueEntity issueEntity;
    private String content;
    private String writeDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private UserEntity userEntity;
    // depth
    private Integer commentLevel;
    // 댓글과 대댓글을 하나로 묶기위한 필드 ==> 부모 댓글일 경우에 null
    private Integer commentGroup;
    // 댓글 과 대댓글의 묶음의 정렬 순서를 나타내는필드
    private Integer commentOrder;

    private Boolean isDeleted;




    public static IssueCommentEntity fromRequest(IssueCommentReq req){
        String writeDate =  LocalDateTime.now().toString();

        return IssueCommentEntity.builder()
                .issueEntity(req.getIssueEntity())
                .content(req.getContent())
                .writeDate(writeDate)
                .userEntity(req.getUserEntity())
                .commentGroup(null)
                .commentOrder(req.getCommentOrder())
                .commentLevel(0)
                .isDeleted(false)
                .build();
    }

}
