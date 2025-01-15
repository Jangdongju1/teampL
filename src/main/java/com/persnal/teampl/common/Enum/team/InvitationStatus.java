package com.persnal.teampl.common.Enum.team;

public enum InvitationStatus {

    CONFIRM(2),
    REJECTED(1),
    ON_PROCESS(0);

    private final int status;

    private InvitationStatus(int status){
        this.status = status;
    }

    public int getValue(){
        return status;
    }
}
