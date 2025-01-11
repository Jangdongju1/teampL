package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.TeamMemberObj;
import com.persnal.teampl.dto.response.ApiResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class InvitationMemberResponse {
    private final List<TeamMemberObj> invitedMember;

    public InvitationMemberResponse(List<TeamMemberObj> invitedMember) {
        this.invitedMember = invitedMember;
    }

    public ResponseEntity<ApiResponse<InvitationMemberResponse>> success(List<TeamMemberObj> list) {
        ApiResponse<InvitationMemberResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new InvitationMemberResponse(list));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
