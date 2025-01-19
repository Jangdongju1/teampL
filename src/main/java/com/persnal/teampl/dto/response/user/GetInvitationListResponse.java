package com.persnal.teampl.dto.response.user;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.vo.invitation.InvitationInfo;
import com.persnal.teampl.dto.response.ApiResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetInvitationListResponse {
    private final List<InvitationInfo> list;

    public GetInvitationListResponse(List<InvitationInfo> list) {
        this.list = list;
    }

    public static ResponseEntity<ApiResponse<GetInvitationListResponse>> success(List<InvitationInfo> list) {

        ApiResponse<GetInvitationListResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetInvitationListResponse(list));

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
