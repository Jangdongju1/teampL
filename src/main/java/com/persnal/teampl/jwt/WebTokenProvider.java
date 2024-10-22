package com.persnal.teampl.jwt;

public interface WebTokenProvider {
    void init();

    String createWebToken(String email, String role, int validTimeSec);

    String getSubject(String token);

    String createTemporaryWebToken(String email, int validTimeSec);
}
