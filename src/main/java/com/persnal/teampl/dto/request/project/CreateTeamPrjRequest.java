package com.persnal.teampl.dto.request.project;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateTeamPrjRequest {
    private Integer regNum;
    private String projectName;
    private String description;
}
