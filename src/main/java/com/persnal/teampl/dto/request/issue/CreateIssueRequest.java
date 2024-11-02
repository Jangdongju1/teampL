package com.persnal.teampl.dto.request.issue;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateIssueRequest {
    private Integer projectNum;
    private Integer stat;
}
