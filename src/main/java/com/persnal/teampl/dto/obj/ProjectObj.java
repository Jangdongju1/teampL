package com.persnal.teampl.dto.obj;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectObj {
    // 단순 프로젝트의 정보를 전달하는 임시 객체
    private Integer projectNum;
    private Integer regNum;
    private String projectName;
    private String description;
    private String createDate;
    private String creator;
    private Integer stat;
    private Integer projectType;
}
