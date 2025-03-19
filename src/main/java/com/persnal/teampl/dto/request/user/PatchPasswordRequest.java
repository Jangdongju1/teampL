package com.persnal.teampl.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchPasswordRequest {
    @NotBlank
    @NotNull
    private String currentPassword;

    // 비밀번호는 영문, 숫자 , 특수문자를 포함하고 8~12자 이어야 한다.
    @NotBlank
    @NotNull
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[\\W_]).{8,12}$",
            message ="영문 숫자 특수문자 포함 8자 ~ 12자")
    private String passwordToChange;

}
