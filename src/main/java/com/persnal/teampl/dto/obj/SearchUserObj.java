package com.persnal.teampl.dto.obj;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class SearchUserObj {
    private String email;
    private String nickname;
    private String profileImg;
}
