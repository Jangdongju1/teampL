package com.persnal.teampl.dto.response;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private String code;
    private String message;


    public static ResponseEntity<Response> initialServerError() {
        Response response = new Response(ResponseCode.INITIAL_SERVER_ERROR, ResponseMessage.INITIAL_SERVER_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    public static ResponseEntity<Response> validationFailed() {
        Response response = new Response(ResponseCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

}
