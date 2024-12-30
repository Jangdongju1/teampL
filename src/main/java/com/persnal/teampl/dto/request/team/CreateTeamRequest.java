package com.persnal.teampl.dto.request.team;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTeamRequest {
    private String teamName;
    private String description;
}
