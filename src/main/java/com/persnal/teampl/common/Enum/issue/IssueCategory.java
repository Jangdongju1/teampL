package com.persnal.teampl.common.Enum.issue;

public enum IssueCategory {
    BUG_FIX(0),
    NEW_DEVELOPMENT(1),
    PERFORMANCE_IMPROVE(2),
    FEATURE_ENHANCEMENT(3),
    TEST(4),
    ETC(5);

    private final int value;

    private IssueCategory(int value){
        this.value = value;
    }

    public int getValue(){
        return value;
    }
}
