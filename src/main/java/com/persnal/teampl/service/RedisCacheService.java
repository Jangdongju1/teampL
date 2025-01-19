package com.persnal.teampl.service;

import com.persnal.teampl.vo.invitation.InvitationInfo;
import com.persnal.teampl.dto.request.team.RegistrationMemberRequest;

import java.util.Set;

public interface RedisCacheService {
    void authCodeCache(String key, String value);

    boolean isExistKey(String email, int database);

    String findByKey(String key, int database);

    void invitationCache(InvitationInfo info, Set<String> members);

    void registrationMemberCache(String email, RegistrationMemberRequest req);
}
