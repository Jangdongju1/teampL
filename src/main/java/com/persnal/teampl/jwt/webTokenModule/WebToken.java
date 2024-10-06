package com.persnal.teampl.jwt.webTokenModule;

public interface WebToken {
    public void init();
    public String createWebToken(String email);
    public String getSubject(String token);

}
