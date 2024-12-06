package com.persnal.teampl.dto.response.issue;

import com.persnal.teampl.dto.obj.CommentObj;
import com.persnal.teampl.dto.obj.IssueObj;
import lombok.Getter;

import java.util.List;

@Getter
public class IssueDateTest {
    private IssueObj issue;
    private List<CommentObj> list;
}
