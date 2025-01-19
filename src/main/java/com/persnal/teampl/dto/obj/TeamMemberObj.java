package com.persnal.teampl.dto.obj;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TeamMemberObj {
    private Integer regNum;
    private String email;
    private String profileImg;
    private String teamName;
    // 추가된 필드
    private String nickname;

    // query Dsl용  생성자
    public TeamMemberObj(String email, String profileImg, String nickname) {
        this.email = email;
        this.profileImg = profileImg;
        this.nickname = nickname;
    }

    public TeamMemberObj(Integer regNum, String email, String profileImg, String teamName) {
        this.regNum = regNum;
        this.email = email;
        this.profileImg = profileImg;
        this.teamName = teamName;
    }
}
