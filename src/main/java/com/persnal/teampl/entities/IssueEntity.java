package com.persnal.teampl.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "issue")
public class IssueEntity {
    @Id
    private int issueNum;
    @ManyToOne
    @JoinColumn(name = "projectNum")
    private ProjectEntity projectEntity;

    @ManyToOne
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

    @OneToMany(mappedBy = "issue",fetch = FetchType.LAZY)
    Set<IssueCommentEntity> issueCommentEntities;
}
