package com.persnal.teampl.dto.request.issue;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostIssueCommentRequest {
    private Integer projectNum;
    private Integer issueNum;
    private String comment;
}
