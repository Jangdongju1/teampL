package com.persnal.teampl.common.Enum.team;

public enum TeamRole {
    MEMBER(0),
    CHIEF(1);

    private final int roleValue;

    private TeamRole(int value) {
        this.roleValue = value;
    }

    public int getRoleValue() {
        return roleValue;
    }

}
