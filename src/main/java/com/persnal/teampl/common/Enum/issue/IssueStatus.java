package com.persnal.teampl.common.Enum.issue;

public enum IssueStatus {
    NOT_START(0),
    ON_WORKING(1),
    STUCK(2),
    DONE(3);

    private final int value;

    private IssueStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}
