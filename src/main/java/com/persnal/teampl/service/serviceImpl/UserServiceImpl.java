package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.user.LoginUserResponse;
import com.persnal.teampl.repository.jpa.UserRepository;
import com.persnal.teampl.service.UserService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super ApiResponse<LoginUserResponse>> isLoginUser(String email) {
        try {
            boolean isExist = userRepository.existsByEmail(email);
            if (!isExist) return LoginUserResponse.notExistUser();

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN,this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return LoginUserResponse.success();
    }
}
