package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.dto.respose.auth.SignUpResponse;
import com.persnal.teampl.repository.UserRepository;
import com.persnal.teampl.service.AuthService;
import com.persnal.teampl.service.MailAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final MailAuthService mailAuthService;

    @Override
    public ResponseEntity<? super SignUpResponse> signUpAuth(String email) {
        boolean isExistUser = userRepository.existsByEmail(email);
        if (!isExistUser){
            // Redis 조회 후 다른 방식으로 이메일을 보낼꺼야
            mailAuthService.sendAuthentication(email);
        }

        //db에 존재하는 경우 바로 리턴
        return SignUpResponse.success(email);
    }
}
