package com.persnal.teampl.dto.response.project;
import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.obj.ProjectObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.entities.ProjectEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetPersonalPrjInfoResponse {
    private final ProjectObj projectInfo;
    // 추후에 이슈리스트를 포함하도록 api 수정예정
   // private final List<IssueObj> issueList;


    public GetPersonalPrjInfoResponse(ProjectEntity entity) {
        this.projectInfo = ProjectEntity.getProjectInfo(entity);
    }


    public static ResponseEntity<? super ApiResponse<GetPersonalPrjInfoResponse>> success(ProjectEntity entity) {
        ApiResponse<GetPersonalPrjInfoResponse> responseBody = new ApiResponse<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                new GetPersonalPrjInfoResponse(entity));


        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notExistUser(){
        return ResponseDto.notExistedUser();
    }
    public static ResponseEntity<ResponseDto> notExistProject(){
        return ResponseDto.notExistProject();
    }

}
