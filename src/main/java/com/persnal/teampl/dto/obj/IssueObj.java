package com.persnal.teampl.dto.obj;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class IssueObj {
    // 프로젝트 칸반의 이슈리스트를 담는 객체.
    private Integer issueNum;
    private Integer projectNum;
    private String email;
    private String title;
    private String content;
    private String inCharge;
    private Integer priority;
    private String writeDate;
    private String expireDate;
    private Integer stat;
    private Integer category;
    private String issueSequence;
    private String previousNode;
    private String nextNode;
    private Boolean isDeleted;
    private Long commentCnt;
}
