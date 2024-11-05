package com.persnal.teampl.dto.request.issue;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchIssueTitleRequest {
    private Integer issueNum;
    private Integer projectNum;
    private String title;
}
