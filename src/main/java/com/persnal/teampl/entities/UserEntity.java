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
@Table(name = "user")
public class UserEntity {
    @Id
    private String email;
    private String password;
    @Setter
    private String nickname;
    @Setter
    private String profileImg;
    @Setter
    private String groupName;
    @Setter
    private String role;

    // 일대다 관계에서 부모가 주인이 아님을 선언해야 한다.
    @OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
    Set<IssueEntity> issueEntities;

    @OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
    Set<IssueCommentEntity> issueCommentEntities;

    public UserEntity(String password,String nickname, String email) {
        this.password = password;
        this.email = email;
        if (nickname.isEmpty()) {
            this.nickname = email;
        } else {
            this.nickname = nickname;
        }
    }
}
