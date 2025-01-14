package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.team.InvitationMemberRequest;

public interface RedisCacheService {
    void authCodeCache(String key, String value);

    boolean isExistEmail(String email);

    String findCodeByEmail(String email);

    void invitationCache(String email, InvitationMemberRequest req);
}
