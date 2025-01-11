package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.SearchUserObj;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.dto.response.user.GetSearchUserResponse;
import com.persnal.teampl.dto.response.user.LoginUserResponse;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.jpa.UserRepository;
import com.persnal.teampl.service.UserService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public ResponseEntity<? super ApiResponse<GetSearchUserResponse>> userSearch(String email,String word) {
        List<SearchUserObj> list = null;
        try {
            UserEntity userEntity = userRepository.findByEmail(word);

            list = new ArrayList<>();

            // like 검색으로 바꾸어 여러명의 사용자를 반환하도록 바꿀 수 있으므로 list로 반환할 예정임.
            if (userEntity != null && !userEntity.getEmail().equals(email)){


                SearchUserObj user = SearchUserObj.builder()
                        .email(userEntity.getEmail())
                        .profileImg(userEntity.getProfileImg())
                        .nickname(userEntity.getNickname())
                        .build();

                list.add(user);
            }

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN,this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetSearchUserResponse.success(list);
    }
}
