package com.persnal.teampl.service;

import com.persnal.teampl.dto.request.team.InvitationMemberRequest;

public interface RedisCacheService {
    void authCodeCache(String key, String value);

    boolean isExistKey(String email, int database);

    String findByKey(String key, int database);

    void invitationCache(String email, InvitationMemberRequest req);
}
