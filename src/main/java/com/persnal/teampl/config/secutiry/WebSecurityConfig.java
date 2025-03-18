package com.persnal.teampl.config.secutiry;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.config.secutiry.exception.FailedAuthenticationEntryPoint;
import com.persnal.teampl.config.secutiry.filter.JwtAuthFilter;
import com.persnal.teampl.config.secutiry.filter.LoginFilter;
import com.persnal.teampl.extendclass.oauth.OAuthAuthenticationSuccessHandler;
import com.persnal.teampl.jwt.WebTokenProvider;
import com.persnal.teampl.service.CustomOauth2UserService;
import com.persnal.teampl.util.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final AuthenticationConfiguration authenticationConfiguration;
    private final WebTokenProvider provider;
    private final CustomOauth2UserService customOauth2UserService;
    private final OAuthAuthenticationSuccessHandler oAuthAuthenticationSuccessHandler;


    public WebSecurityConfig(AuthenticationConfiguration authenticationConfiguration,
                             WebTokenProvider provider,
                             CustomOauth2UserService customOauth2UserService,
                             OAuthAuthenticationSuccessHandler oAuthAuthenticationSuccessHandler) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.provider = provider;
        this.customOauth2UserService = customOauth2UserService;
        this.oAuthAuthenticationSuccessHandler = oAuthAuthenticationSuccessHandler;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() { // security를 적용하지 않을 리소스
//        return web -> web.ignoring()
//                // error endpoint를 열어줘야 함, favicon.ico 추가!
//                .requestMatchers("/error", "/favicon.ico");
//    }

    @Bean
    protected SecurityFilterChain config(HttpSecurity httpSecurity) throws Exception {
        SecurityFilterChain chain = null;
        try {

            // security Basic, csrf config.
            httpSecurity.httpBasic(AbstractHttpConfigurer::disable);
            httpSecurity.csrf(AbstractHttpConfigurer::disable);

            // formLogin disable
            httpSecurity.formLogin(AbstractHttpConfigurer::disable);


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
                        .requestMatchers(HttpMethod.POST, "/", "/api/v1/auth/auth-code").permitAll()   // 인증코드 발급
                        .requestMatchers(HttpMethod.GET, "api/v1/auth/oauth2/**").permitAll()  // 테스트용 코드
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/sign-in").permitAll()
                        .requestMatchers(HttpMethod.GET,"/file/uploads/**").permitAll()
                        .anyRequest().authenticated();
            });

            httpSecurity.exceptionHandling(handler -> {
                // 예외 발생시 처리할 클래스
                handler.authenticationEntryPoint(new FailedAuthenticationEntryPoint());
            });

            // api기반의 인증은 폼 인증과 달리 UsernamePasswordAuthenticationFilter가 필요없음
            // 그래서 이 필터 대신에 커스텀 필터를 넣어줄 예정.

            // 필터를 두개를 사용했다.
            httpSecurity.addFilterBefore(new JwtAuthFilter(provider), UsernamePasswordAuthenticationFilter.class);

            UsernamePasswordAuthenticationFilter loginFilter = new LoginFilter(authenticationManager(authenticationConfiguration), provider);
            loginFilter.setFilterProcessesUrl("/api/v1/auth/sign-in");  // 로그인필터 url

            httpSecurity.addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class);

            // oauth 필터 추가
            httpSecurity.oauth2Login(oauth -> oauth
                    .userInfoEndpoint(c -> c.userService(customOauth2UserService))
                    .successHandler(oAuthAuthenticationSuccessHandler));

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
