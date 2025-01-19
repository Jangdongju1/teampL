package com.persnal.teampl.dto.request.issue;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchIssueInChargeRequest {
    private Integer issueNum;
    private String inCharge;
}
