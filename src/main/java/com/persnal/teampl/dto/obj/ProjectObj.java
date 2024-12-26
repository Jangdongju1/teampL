package com.persnal.teampl.dto.obj;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
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

}
