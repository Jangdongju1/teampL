package com.persnal.teampl.common.Enum.issue;

public enum IssuePriority {
    NORMAL(0),
    LONG_TERM(1),
    URGENT(2),
    VERY_URGENT(3);

    private final int value;

    private IssuePriority(int value) {
        this.value = value;
    }

    public int getValue(){
        return this.value;
    }
}
