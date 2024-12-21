package com.persnal.teampl.dto.obj;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProjectInfoObj {
    private Integer projectNum; //프로젝트의 등록번호
    private String projectName;
    private String owner;
    private Integer projectType;
    private Integer stat;
    private String teamName;
}
