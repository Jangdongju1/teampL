package com.persnal.teampl.entities;

import com.persnal.teampl.dto.request.team.CreateTeamRequest;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "team")
public class TeamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int regNum;
    private String email;
    private int jobNum;
    private String teamName;
    private String description;
    private String createDate;
    private String Sequence;
    private boolean isDeleted;

    @OneToMany(mappedBy = "teamEntity", fetch = FetchType.LAZY)
    private Set<ProjectEntity> projectEntities;

    public TeamEntity(int regNum) {
        this.regNum = regNum;
    }
    // mappedBy
    // 일대다 관계에서 주인은 FK가 있는 쪽이되어야 하므로, 이 설정으로 이 엔티티는 주인이 아님을 선언한 것.
    // 관계를 설정하면 연관된 엔티티까지 모두 검색이 되기에 양방향 접근이 가능해진다.
    // FetchType.LAZY
    // 일대다 관계에서  부모엔티티는 PK를 가지고 고 자식엔티티는 그 PK를 참조키초 가지고있다.
    // 이러한 관계에서 부모엔티티를 조회하면 자식엔티티까지 모두 달려나오게 되는데 위 설정을 한다면, 해당 부분을 막을 수 있다.
    // 원리는  teamEntity.getProjectEntity() 이런식으로 접근할때 추가쿼리가 실행된다.

    public static TeamEntity fromRequest(CreateTeamRequest req, String email) {
        String teamPrefix = email.split("@")[0]; // 이메일의 앞부분
        long teamSuffix = System.currentTimeMillis();  // 현제시간에 대한 유닉스 타임

        String now = LocalDateTime.now().toString();

        return TeamEntity.builder()
                .teamName(req.getTeamName())
                .description(req.getDescription())
                .email(email)
                .jobNum(0) // jobNum은 추후에 확장시 쓸 예정
                .createDate(now)
                .Sequence(teamPrefix + "-" + teamSuffix)  // 시퀀스 설정
                .isDeleted(false)
                .build();


    }

}
