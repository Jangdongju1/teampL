package com.persnal.teampl.dto.obj.temp;

import com.persnal.teampl.entities.IssueCommentEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class IssueCommentFetchData {
    private List<IssueCommentEntity> commentList;
    private Long count;

}
