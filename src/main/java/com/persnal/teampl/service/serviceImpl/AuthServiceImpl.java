package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeConfirmResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeResponse;
import com.persnal.teampl.jwt.webTokenModule.WebTokenProvider;
import com.persnal.teampl.repository.UserRepository;
import com.persnal.teampl.service.AuthService;
import com.persnal.teampl.service.MailAuthService;
import com.persnal.teampl.service.RedisCacheService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private Logger logger = LoggerFactory.getLogger(this.getClass().getName());
    private final UserRepository userRepository;
    private final MailAuthService mailAuthService;
    private final RedisCacheService redisCacheService;
    private final WebTokenProvider webTokenProvider;

    @Value("${token.expire.auth-code-token}")
    int authCodeTokenExpireTime;
    @Value("${token.expire.login-token}")
    int loginTokenExpireTime;

    @Override
    public ResponseEntity<? super ApiResponse<AuthCodeResponse>> signUpAuth(String email) {
        String token = "";
        try {
            boolean isExistUser = userRepository.existsByEmail(email);
            if (isExistUser) return AuthCodeResponse.existUser();

            boolean alreadySent = redisCacheService.isExistEmail(email);

            if (alreadySent) return AuthCodeResponse.emailAlreadySent();

            mailAuthService.sendAuthentication(email);
            token = webTokenProvider.createWebToken(email, authCodeTokenExpireTime);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), e.getMessage());
        }

        return AuthCodeResponse.success(email, token);
    }

    @Override
    public ResponseEntity<? super ApiResponse<AuthCodeConfirmResponse>> confirmCode(String email, String code) {
        String token = "";

        try {
            String cachedCode = redisCacheService.findCodeByEmail(email);

            if (cachedCode == null) return AuthCodeConfirmResponse.expiredCode();

            if (!code.equals(cachedCode)) return AuthCodeConfirmResponse.invalidCode();

            token = webTokenProvider.createWebToken(email, loginTokenExpireTime);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), e.getMessage());
        }

        return AuthCodeConfirmResponse.success(token, loginTokenExpireTime);
    }
}
