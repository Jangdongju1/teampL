package com.persnal.teampl.dto.obj;

import com.persnal.teampl.entities.IssueEntity;
import com.persnal.teampl.entities.UserEntity;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class IssueCommentReq {
    private IssueEntity issueEntity;
    private UserEntity userEntity;
    private String content;
    private Integer commentOrder;
}
