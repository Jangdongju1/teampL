package com.persnal.teampl.dto.obj.temp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PatchIssueTitleRepObj {
    // 이슈 타이틀 변경시 상태 업데이트를 위한 응답 값을 담는 객체.
    private Integer projectNum;
    private Integer issueNum;
    private Integer stat;
    private String changedTitle;
}
