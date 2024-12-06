package com.persnal.teampl.dto.request.issue;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PatchIssueCommentRequest {
    private Integer issueNum;
    private Integer commentNum;
    private String comment;

}
