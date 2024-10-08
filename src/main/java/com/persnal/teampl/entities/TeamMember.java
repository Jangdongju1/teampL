package com.persnal.teampl.entities;

import com.persnal.teampl.entities.compositeKey.TeamMemberPk;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "team_member")
public class TeamMember {
//    private int regNum;
//    private String email;
    @EmbeddedId
    private TeamMemberPk teamMemberPk;// composite Key
    private int position;
    private int teamRole;
    private boolean isWithdrawal;
}
