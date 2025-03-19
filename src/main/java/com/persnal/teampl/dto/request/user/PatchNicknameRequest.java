package com.persnal.teampl.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchNicknameRequest {
    @NotNull @NotBlank
    private String nickname;
}
