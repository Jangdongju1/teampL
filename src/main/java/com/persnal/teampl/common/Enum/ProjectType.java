package com.persnal.teampl.common.Enum;

public enum ProjectType {
    PERSONAL_PROJECT(0),
    TEAM_PROJECT(1);

    private int value;

    private ProjectType(int value) {
        this.value = value;
    }

    public int getValue(){
        return this.value;
    }
}
