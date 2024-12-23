package com.persnal.teampl.dto.obj.temp;

import com.persnal.teampl.entities.ProjectEntity;
import com.persnal.teampl.entities.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CreateIssueTempDto {
    private UserEntity userEntity;
    private ProjectEntity projectEntity;
    private Integer issueStat;
    private String issueSequence;
    private String nextNode;

}
