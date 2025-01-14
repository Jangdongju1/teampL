package com.persnal.teampl.dto.request.team;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class InvitationMemberRequest {
    private Integer regNum;
    private Set<String> members;
}
