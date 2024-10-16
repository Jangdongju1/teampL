package com.persnal.teampl.entities.compositeKey;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamMemberPk implements Serializable {
    // 복합키 지정
    @Column(name = "email")
    private String email;
    @Column(name = "regNum")
    private int regNum;
}