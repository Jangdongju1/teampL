package com.persnal.teampl.dto.obj.invitation;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class InvitationList {
    // 팀원 초대에 대한 데이터 저장 최종 형태.
    Map<Integer, InvitationInfo> list;

    public static InvitationList createInvitationList() {
        return new InvitationList();
    }
}
