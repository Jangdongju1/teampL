package com.persnal.teampl.config.secutiry.filter;

import com.google.gson.Gson;
import com.persnal.teampl.common.ResponseCode;
import com.persnal.teampl.common.ResponseMessage;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.request.auth.SignInRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.auth.SignInResponse;
import com.persnal.teampl.jwt.WebTokenProvider;
import com.persnal.teampl.util.Utils;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final AuthenticationManager authenticationManager;
    private WebTokenProvider jwtProvider;

    private static final int TOKEN_EXPIRY_TIME = 10800;

    public LoginFilter(AuthenticationManager authenticationManager, WebTokenProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }


    @PostConstruct
    public void init() {
        super.setAuthenticationManager(this.authenticationManager);

    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // username , password받음
        String username = "";
        String password = "";

        String line = "";
        StringBuilder sb = new StringBuilder();

        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            SignInRequest req = new Gson().fromJson(sb.toString(), SignInRequest.class);

            username = req.getEmail();
            password = req.getPassword();


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }

        //필터 >> Authentication Manager 에게 유저의 정보를 전달해 인증을 진행하는데 여기서 그냥 던지면 안되공,바구니(UsernamePassword Authentication Token)에 담에서 던져야 한다.
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password, null);


        return authenticationManager.authenticate(authToken);
    }

    // 인증 성공시
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // userDetails 객체로부터 유저의 정보를 가져온다.
        UserDetails userDetails = (UserDetails) authResult.getPrincipal();
        String userEmail = userDetails.getUsername();
        String role = "";


        Collection<? extends GrantedAuthority> authorities = authResult.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();  // iterator로 접근
        GrantedAuthority grantedAuthority = iterator.next();

        role = grantedAuthority.getAuthority();

        String token = jwtProvider.createWebToken(userEmail, role, TOKEN_EXPIRY_TIME);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.OK.value());

        ApiResponse<SignInResponse> responseBody =
                new ApiResponse<>(
                        ResponseCode.SUCCESS,
                        ResponseMessage.SUCCESS,
                        new SignInResponse(token, TOKEN_EXPIRY_TIME));


        response.getWriter().write(new Gson().toJson(responseBody));

    }

    //인증 실패시
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAILED ,ResponseMessage.SIGN_IN_FAILED);
        response.getWriter().write(new Gson().toJson(responseBody));
    }

}
