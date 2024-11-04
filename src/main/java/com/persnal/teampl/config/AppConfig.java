package com.persnal.teampl.config;

import com.google.gson.Gson;
import com.persnal.teampl.config.secutiry.filter.JwtAuthFilter;
import com.persnal.teampl.config.secutiry.filter.LoginFilter;
import com.persnal.teampl.jwt.WebTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.DecimalFormat;

@Configuration
@RequiredArgsConstructor
public class AppConfig {
    private WebTokenProvider webTokenProvider;
    // 외부 라이브러리데 대한 빈을 모아두는 클래스
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DecimalFormat decimalFormat(){
        return new DecimalFormat("00");
    }
}
