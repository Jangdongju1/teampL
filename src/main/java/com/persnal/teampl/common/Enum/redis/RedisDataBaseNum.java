package com.persnal.teampl.common.Enum.redis;

public enum RedisDataBaseNum {
    AUTH_CODE(0),
    INVITATION_MEMBER(1);


    private final int database;

    private RedisDataBaseNum(int database) {
        this.database = database;
    }

    public int getValue() {
        return database;
    }
}
