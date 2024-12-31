package com.persnal.teampl.dto.obj;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class TeamListObj {
    private Integer regNum;
    private String email;
    private String teamName;
    private String sequence;
    private String createDate;
    private String description;
    private Integer projects;
    private Integer members;
}
