package com.persnal.teampl.dto.request.issue;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchIssueCategoryRequest {
    private Integer projectNum;
    private Integer issueNum;
    private Integer category;
}
