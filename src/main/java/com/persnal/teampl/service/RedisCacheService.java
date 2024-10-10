package com.persnal.teampl.service;

public interface RedisCacheService {
    public void authCodeCache(String key, String value);
    public boolean isExistEmail(String email);
    public String findCodeByEmail(String email);
}
