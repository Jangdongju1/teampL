package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.request.auth.SigInRequest;
import com.persnal.teampl.dto.request.auth.SignUpRequest;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.auth.AuthCodeConfirmResponse;
import com.persnal.teampl.dto.response.auth.AuthCodeResponse;
import com.persnal.teampl.dto.response.auth.SignInResponse;
import com.persnal.teampl.dto.response.auth.SignUpResponse;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.jwt.webTokenModule.WebTokenProvider;
import com.persnal.teampl.repository.UserRepository;
import com.persnal.teampl.service.AuthService;
import com.persnal.teampl.service.MailAuthService;
import com.persnal.teampl.service.RedisCacheService;
import com.persnal.teampl.util.Utils;
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
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }

        return AuthCodeResponse.success(email, token);
    }

    @Override
    public ResponseEntity<? super ApiResponse<AuthCodeConfirmResponse>> confirmCode(String email, String code) {
        try {
            String cachedCode = redisCacheService.findCodeByEmail(email);

            if (cachedCode == null) return AuthCodeConfirmResponse.expiredCode();

            if (!code.equals(cachedCode)) return AuthCodeConfirmResponse.invalidCode();

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }

        return AuthCodeConfirmResponse.success();
    }

    @Override
    public ResponseEntity<? super ApiResponse<SignUpResponse>> signUp(String email, SignUpRequest req) {
        String token = null;
        try {
            UserEntity userEntity = new UserEntity(req, email);

            userRepository.save(userEntity);  // 저장을 하고

            token = webTokenProvider.createWebToken(email, loginTokenExpireTime);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return SignUpResponse.success(token, loginTokenExpireTime);
    }


    // 이작업을  정석으로 한번 구현해보자
    @Override
    public ResponseEntity<? super ApiResponse<SignInResponse>> signIn(SigInRequest req) {
        String token = null;
        try {
            UserEntity userEntity = userRepository.findByEmail(req.getEmail());
            if (userEntity == null)
                return SignInResponse.notExistedUser();
            if (!userEntity.getPassword().equals(req.getPassword()))
                return SignInResponse.invalidInformation();

            token = webTokenProvider.createWebToken(req.getEmail(), loginTokenExpireTime);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return SignInResponse.success(token, loginTokenExpireTime);
    }
}
