package com.persnal.teampl.extendclass.oauth;

import com.persnal.teampl.common.Enum.user.UserRole;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.implementclass.oauth.OAuth2UserImpl;
import com.persnal.teampl.jwt.webTokenImpl.JwtProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class OAuthAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    // 토큰의 유효시간
    @Value("${token.expire.login-token}")
    private Integer expireTimeSec_Main;
    @Value("${token.expire.auth-code-token}")
    private Integer expireTimeSec_Auth;


    // 소셜 로그인 성공시 처리 헨들러
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserEntity user = ((OAuth2UserImpl) authentication.getPrincipal()).getUser();
        String encodedEmail = Base64.getEncoder().encodeToString(user.getEmail().getBytes(StandardCharsets.UTF_8));


        if (user.getRole().equals(UserRole.GUEST.getRole())) {
            String accessToken = jwtProvider.createWebToken(user.getEmail(), user.getRole(), expireTimeSec_Auth);


            // 쿠키를 설정하고
            Cookie authCookie = new Cookie("accessToken_Auth", accessToken);
            authCookie.setHttpOnly(true);  // 자바스크립트에서 쿠키값을 읽을 수 있도록 해야함.
            authCookie.setMaxAge(expireTimeSec_Auth);
            authCookie.setPath("/");

            response.addCookie(authCookie);

            // ROLE  == GUEST 인경우 (처음 가입) >> 회원가입페이지
            String url = "http://localhost:3000/auth/reg-password/"+ encodedEmail;

            String redirectUrl = UriComponentsBuilder.fromUriString(url)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();

            getRedirectStrategy().sendRedirect(request, response, redirectUrl);

        }else {
            // userRole  == user 인 경우  >> 메인페이지
        }

    }
}
