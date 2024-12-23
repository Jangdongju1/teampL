package com.persnal.teampl.dto.obj;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProjectInfoObj {
    // 사용자가 보는 모달의 프로젝트 리스트를 전달하는 객체 .
    private Integer projectNum; //프로젝트의 등록번호
    private String projectName;
    private String owner;
    private Integer projectType;
    private Integer stat;
    private String teamName;
}
