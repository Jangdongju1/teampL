package com.persnal.teampl.dto.obj;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreatedTeamInfo {
    private Integer regNum;
    private String teamName;
    private String description;
    private String createDate;
    private String sequence;
}
