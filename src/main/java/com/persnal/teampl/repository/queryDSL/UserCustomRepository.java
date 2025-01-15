package com.persnal.teampl.repository.queryDSL;

import com.persnal.teampl.dto.obj.invitation.InvitationInfo;
import com.persnal.teampl.dto.request.team.InvitationMemberRequest;

import java.util.Set;

public interface UserCustomRepository {
    InvitationInfo getInvitationInfo(String email, Integer regNum);
}
