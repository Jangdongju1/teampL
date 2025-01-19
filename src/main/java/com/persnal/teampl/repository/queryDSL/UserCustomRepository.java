package com.persnal.teampl.repository.queryDSL;

import com.persnal.teampl.vo.invitation.InvitationInfo;

public interface UserCustomRepository {
    InvitationInfo getInvitationInfo(String email, Integer regNum);
}
