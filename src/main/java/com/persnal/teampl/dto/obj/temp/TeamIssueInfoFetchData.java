package com.persnal.teampl.dto.obj.temp;

import com.persnal.teampl.dto.obj.IssueObj;
import com.persnal.teampl.dto.obj.TeamMemberObj;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TeamIssueInfoFetchData {
    // DB로 부터 데이터를 받아오기 위한 임시 객체
    private IssueObj issue;
    private List<TeamMemberObj> members;
}
