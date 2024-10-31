package com.persnal.teampl.dto.obj;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectObj {
    private Integer projectNum;
    private Integer regNum;
    private String projectName;
    private String description;
    private String createDate;
    private String creator;
    private Integer stat;
    private Integer projectType;
}
