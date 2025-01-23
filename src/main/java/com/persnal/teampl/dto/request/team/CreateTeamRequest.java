package com.persnal.teampl.dto.request.team;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class CreateTeamRequest {
    @NotNull @NotBlank @Size(min = 2, max = 50)
    private String teamName;
    private String description;
}
