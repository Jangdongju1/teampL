package com.persnal.teampl.dto.response.project;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CreatePrjResponse {
    private final ProjectObj created;

    public CreatePrjResponse(ProjectObj created) {
        this.created = created;
    }

    public static ResponseEntity<? super ApiResponse<CreatePrjResponse>> success(ProjectObj info){
        ApiResponse<CreatePrjResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new CreatePrjResponse(info)
        );
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser (){
        return ResponseDto.notExistedUser();
    }
}
