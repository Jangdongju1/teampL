package com.persnal.teampl.dto.request.issue;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchIssueStatusDragRequest {
    private Integer projectNum;
    private Integer issueNum;
    private Integer dstStat;
    private String dstPreNode;
    private String dstNextNode;
}
