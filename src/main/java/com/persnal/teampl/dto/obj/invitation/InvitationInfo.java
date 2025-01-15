package com.persnal.teampl.dto.obj.invitation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvitationInfo implements Cloneable {
    private Integer regNum;
    private String teamName;
    private String sequence;
    private String email;
    private String profileImg;
    private String invitedDate;
    private Integer isConfirm;


    // queryDsl적용을 위한 생성자
    public InvitationInfo(Integer regNum, String teamName, String sequence, String email, String profileImg) {
        this.regNum = regNum;
        this.teamName = teamName;
        this.sequence = sequence;
        this.email = email;
        this.profileImg = profileImg;
    }


    // 하기 두가지 요소가 같다면 같은 객체로 봄

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InvitationInfo that = (InvitationInfo) o;
        return Objects.equals(regNum, that.regNum) && Objects.equals(email, that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(regNum, email);
    }

    @Override
    public InvitationInfo clone() throws CloneNotSupportedException {
        return (InvitationInfo) super.clone();
    }
}
