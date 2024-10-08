package com.persnal.teampl.jwt.webTokenModule;

public interface WebTokenProvider {
    public void init();
    public String createWebToken(String email,int validTimeSec);
    public String getSubject(String token);
}
