package com.persnal.teampl.config.secutiry;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.config.secutiry.exception.FailedAuthenticationEntryPoint;
import com.persnal.teampl.config.secutiry.filter.JwtAuthFilter;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final JwtAuthFilter filter;

    @Bean
    protected SecurityFilterChain config(HttpSecurity httpSecurity) throws Exception {
        SecurityFilterChain chain = null;
        try {

            // security Basic, csrf config.
            httpSecurity.httpBasic(AbstractHttpConfigurer::disable);
            httpSecurity.csrf(AbstractHttpConfigurer::disable);

//            // formLogin disable
//            httpSecurity.formLogin(AbstractHttpConfigurer::disable);


            // cors config
            httpSecurity.cors(httpSecurityCorsConfigurer -> {  //
                httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
            });

            // http session config
            httpSecurity.sessionManagement(managementConfigurer -> {
                managementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            });


            // authentication authorization  config
            httpSecurity.authorizeHttpRequests(authorizeRequests -> {
                authorizeRequests
                        .requestMatchers(HttpMethod.POST, "/", "api/v1/auth/auth-code").permitAll()
                        .anyRequest().authenticated();
            });

            httpSecurity.exceptionHandling(handler -> {
                // 인증실패 발생시 예외를 처리할 클래스.
                handler.authenticationEntryPoint(new FailedAuthenticationEntryPoint());
            });

            // api기반의 인증은 폼 인증과 달리 UsernamePasswordAuthenticationFilter가 필요없음
            // 그래서 이 필터 대신에 커스텀 필터를 넣어줄 예정.

            httpSecurity.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

            chain = httpSecurity.build();
        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
        }

        return chain;
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedMethods(Collections.singletonList("*")); // 1) get 2)post ....
            configuration.setAllowedHeaders(Collections.singletonList("*")); // 1) Authentication, 2)Content-Type
            configuration.setAllowedOriginPatterns(Collections.singletonList("*"));  // 모든 도메인으로 부터의 요청 허용.
            configuration.setAllowCredentials(true);

            return configuration;
        };
    }


}
