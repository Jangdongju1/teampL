package com.persnal.teampl.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignInRequest {
    @NotNull @NotBlank
    private String email;
    @NotNull @NotBlank
    private String password;
}
