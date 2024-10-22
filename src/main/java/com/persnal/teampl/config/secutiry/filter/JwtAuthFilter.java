package com.persnal.teampl.config.secutiry.filter;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.jwt.WebTokenProvider;
import com.persnal.teampl.util.Utils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {  // JWT 검증필터
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final WebTokenProvider provider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String requestURI = request.getRequestURI();
            if (requestURI.startsWith("/api/v1/auth")){
                String token = null;

                token = parseToken(request);


                if (token == null) {
                    filterChain.doFilter(request, response);
                    return;
                }

                // 유효시간은 알아서 검증을 함.

                String email = provider.getSubject(token);

                if (email.isEmpty()) {
                    filterChain.doFilter(request, response);
                    return;
                }

                AbstractAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

                securityContext.setAuthentication(authenticationToken);
                SecurityContextHolder.setContext(securityContext);
            }


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
        }
        filterChain.doFilter(request, response);
    }

    private String parseToken(HttpServletRequest req) {
        String token = "";
        try {
            String authorization = req.getHeader("Authorization");  // header에 Autorization에 저장된 토큰을 가져옴.

            if (authorization == null) return null;

            boolean isBearer = authorization.startsWith("Bearer");

            if (!isBearer) return null;

            token = authorization.substring(7); // Bearer token본문 형태로 헤더에 세팅됨.

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
        }
        return token;
    }
}
