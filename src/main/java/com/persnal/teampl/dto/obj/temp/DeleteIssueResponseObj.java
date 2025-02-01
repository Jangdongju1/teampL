package com.persnal.teampl.dto.obj.temp;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DeleteIssueResponseObj {
    private Integer issueNum;
    private Integer stat;
}
