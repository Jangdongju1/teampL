package com.persnal.teampl.dto.obj.invitation;

import com.persnal.teampl.dto.request.team.InvitationMemberRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
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


        // 객체의 동등비교 1) 해시코드 2) equals로 비교를함
        // 결과적으로 해시코드와 equals가 같아야 동일한 객체로 취급한다.

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            MemberInfo that = (MemberInfo) o;
            return Objects.equals(member, that.member);
        }

        @Override
        public int hashCode() {
            return Objects.hash(member);
        }
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
