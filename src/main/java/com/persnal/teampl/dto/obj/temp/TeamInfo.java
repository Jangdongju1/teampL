package com.persnal.teampl.dto.obj.temp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class TeamInfo {
    private String teamName;
    private String creator;
    private String description;
    private String sequence;
}
