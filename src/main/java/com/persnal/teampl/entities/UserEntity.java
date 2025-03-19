package com.persnal.teampl.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
@Builder
public class UserEntity {
    @Id
    private String email;
    @Setter
    private String password;
    @Setter
    private String nickname;
    @Setter
    private String profileImg;
    @Setter
    private String groupName;
    @Setter
    private String socialType;
    @Setter
    private String socialId;
    @Setter
    private String role;

    // 일대다 관계에서 부모가 주인이 아님을 선언해야 한다.
//    @OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
//    private Set<IssueEntity> issueEntities;
//
//    @OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
//    private List<IssueCommentEntity> issueCommentEntities;
//
//    @OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
//    private Set<ProjectEntity> projectEntities;

    public static UserEntity fromRequest(String password, String nickname, String email){
        return UserEntity.builder()
                .email(email)
                .password(password)
                .nickname(nickname.isEmpty()? email : nickname)
                .build();

    }

}
