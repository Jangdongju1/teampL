package com.persnal.teampl.entities;

import com.persnal.teampl.common.Enum.team.TeamRole;
import com.persnal.teampl.entities.compositeKey.TeamMemberPk;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "team_member")
public class TeamMemberEntity {
//    private int regNum;
//    private String email;
    @EmbeddedId
    private TeamMemberPk teamMemberPk;// composite Key
    private int position;
    private int teamRole;
    private boolean isWithdrawal;


    public static TeamMemberEntity fromRequest(String email, Integer regNum){
        TeamMemberPk teamMemberPk = new TeamMemberPk(email, regNum);

        return TeamMemberEntity.builder()
                .teamMemberPk(teamMemberPk)
                .position(TeamRole.MEMBER.getRoleValue())
                .isWithdrawal(false)
                .build();
    }
}
