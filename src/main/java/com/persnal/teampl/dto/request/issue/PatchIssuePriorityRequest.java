package com.persnal.teampl.dto.request.issue;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchIssuePriorityRequest {
    private Integer projectNum;
    private Integer issueNum;
    private Integer priority;
}
