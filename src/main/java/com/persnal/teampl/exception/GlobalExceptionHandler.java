package com.persnal.teampl.exception;

import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.dto.response.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class, MissingServletRequestParameterException.class})
    public ResponseEntity<ResponseDto> handleValidationException(Exception e) {
//        List<String> errorMessages = e.getBindingResult().getFieldErrors().stream()
//                .map(fieldError -> fieldError.getDefaultMessage())
//                .toList();

        // 상세한 예외처리는 나중에.

        ResponseDto response = new ResponseDto(ResponseCode.BAD_REQUEST, ResponseMessage.NOT_VALID_ARGUMENT);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
