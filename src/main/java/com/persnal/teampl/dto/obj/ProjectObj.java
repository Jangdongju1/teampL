package com.persnal.teampl.dto.obj;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    //-- 새로 추가된 필드
    private String teamName;
    private Long totalIssueCnt;
    private Long processed;
    //private Integer id;   // react table 전용 필드  == projectNum


    public ProjectObj(Integer projectNum, Integer regNum, String projectName, String description, String createDate, String creator, Integer stat, Integer projectType) {
        this.projectNum = projectNum;
        this.regNum = regNum;
        this.projectName = projectName;
        this.description = description;
        this.createDate = createDate;
        this.creator = creator;
        this.stat = stat;
        this.projectType = projectType;
    }
}
