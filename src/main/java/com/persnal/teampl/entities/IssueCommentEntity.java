package com.persnal.teampl.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "issue_comment")
public class IssueCommentEntity {
    @Id
    private int commentNum;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issueNum")
    private IssueEntity issueEntity;
    private String content;
    private String writeDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private UserEntity userEntity;
    private int commentLevel;
    private int commentGroup;
    private int commentOrder;
    private boolean isDeleted;

}
