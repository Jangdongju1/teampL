package com.persnal.teampl.dto.obj.invitation;

import com.persnal.teampl.dto.request.team.InvitationMemberRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Builder
@Getter
@Setter
public class InvitationInfo {
    private Integer regNum;
    private Set<MemberInfo> members;


    @Getter
    @Setter
    @AllArgsConstructor
    public static class MemberInfo {
        private String member;
        private String invitedDate;
    }


    public static MemberInfo createMember(String member, String invitedDate){
        return new MemberInfo(member, invitedDate);
    }

    public static  InvitationInfo getReceiverInfo(InvitationMemberRequest req){
        Set<MemberInfo> receivers = new HashSet<>();

        for (String id : req.getMembers()){
            MemberInfo  info  = createMember(id, LocalDateTime.now().toString());
            receivers.add(info);

        }
        return InvitationInfo.builder()
                .regNum(req.getRegNum())
                .members(receivers)
                .build();
    }

}
