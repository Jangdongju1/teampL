package com.persnal.teampl.dto.obj;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class IssueCommentObj {
    private String email;
    private String picture;
    private Integer commentNum;
    private Integer issueNum;
    private String content;
    private String writeDate;
    private Integer commentLevel;
    private Integer commentGroup;
    private Integer commentOrder;
}
