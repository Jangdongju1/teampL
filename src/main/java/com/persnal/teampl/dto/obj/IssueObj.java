package com.persnal.teampl.dto.obj;

import jakarta.persistence.criteria.CriteriaBuilder;
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
}
