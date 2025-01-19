package com.persnal.teampl.vo.invitation;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.Set;

@Getter
@Setter
public class InvitationList {
    // 팀원 초대에 대한 데이터 저장 최종 형태.
    Map<Integer, Set<InvitationInfo>> list;
}
