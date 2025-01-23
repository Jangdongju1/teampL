package com.persnal.teampl.config.secutiry.exception;

import com.google.gson.Gson;
import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.util.Utils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.io.IOException;

public class FailedAuthenticationEntryPoint  implements AuthenticationEntryPoint {
    private Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        logger.error(GlobalVariable.LOG_PATTERN,getClass().getName(), Utils.getStackTrace(authException));

        if (authException instanceof BadCredentialsException) {}

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);// 인증실패

        ResponseDto authenticationFailed = new ResponseDto(ResponseCode.AUTHENTICATION_FAILED, ResponseMessage.AUTHENTICATION_FAILED);
        response.getWriter().write(new Gson().toJson(authenticationFailed));
    }
}
