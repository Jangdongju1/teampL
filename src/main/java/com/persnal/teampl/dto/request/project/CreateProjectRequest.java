package com.persnal.teampl.dto.request.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateProjectRequest {
    @NotNull @NotBlank @Size(max = 50)
    private String projectName;
    private String description;
}
