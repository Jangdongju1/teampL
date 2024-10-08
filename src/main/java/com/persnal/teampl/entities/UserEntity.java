package com.persnal.teampl.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    private String email;
    @NotNull
    private String password;
    @Setter
    private String nickname;
    @Setter
    private String profileImg;
    @Setter
    private String groupName;

    // 일대다 관계에서 부모가 주인이 아님을 선언해야 한다.
    @OneToMany(mappedBy = "issue", fetch = FetchType.LAZY)
    Set<IssueEntity> issueEntities;

    @OneToMany(mappedBy = "issue", fetch = FetchType.LAZY)
    Set<IssueCommentEntity> issueCommentEntities;

}
