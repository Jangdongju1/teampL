package com.persnal.teampl.dto.response;

import lombok.Getter;

@Getter
public class ApiResponse<D> extends Response {
    private final D data;

    public ApiResponse(String code, String message, D data) {
        super(code, message);
        this.data = data;
    }



}
