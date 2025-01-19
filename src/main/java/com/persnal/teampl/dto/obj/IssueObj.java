package com.persnal.teampl.dto.obj;

import jakarta.persistence.Transient;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class IssueObj {
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
    // 새로 추가된 필드
    private String teamName; // 팀 의 이슈정보에 teamName이 존재함.
    @Transient
    private Integer commentCnt;  //이슈 카드 뿌릴때 댓글 수
}
