package com.persnal.teampl.common.Enum.project;

public enum ProjectStat {
    ON_WORKING(0),
    COMPLETE(1);

    private int value;
    private ProjectStat(int value) {
        this.value = value;
    }

    public int getValue(){
        return this.value;
    }
}
