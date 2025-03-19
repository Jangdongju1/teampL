package com.persnal.teampl.service.serviceImpl;

import com.google.gson.Gson;
import com.persnal.teampl.common.Enum.redis.RedisDataBaseNum;
import com.persnal.teampl.common.Enum.team.InvitationStatus;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.dto.obj.SearchUserObj;
import com.persnal.teampl.dto.request.user.PatchNicknameRequest;
import com.persnal.teampl.dto.request.user.PatchPasswordRequest;
import com.persnal.teampl.dto.response.user.*;
import com.persnal.teampl.service.FileService;
import com.persnal.teampl.vo.invitation.InvitationInfo;
import com.persnal.teampl.vo.invitation.InvitationList;
import com.persnal.teampl.dto.response.ApiResponse;
import com.persnal.teampl.dto.response.ResponseDto;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.jpa.UserRepository;
import com.persnal.teampl.service.RedisCacheService;
import com.persnal.teampl.service.UserService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());
    private final UserRepository userRepository;
    private final RedisCacheService redisCacheService;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;



    @Override
    public ResponseEntity<? super ApiResponse<LoginUserResponse>> isLoginUser(String email) {
        UserEntity user = null;
        try {
            user = userRepository.findByEmail(email);

            if (user == null) return LoginUserResponse.notExistUser();

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return LoginUserResponse.success(user.getEmail(), user.getNickname(), user.getProfileImg());

    }

    @Override
    public ResponseEntity<? super ApiResponse<GetSearchUserResponse>> userSearch(String email, String word) {
        List<SearchUserObj> list = null;
        try {
            UserEntity userEntity = userRepository.findByEmail(word);

            list = new ArrayList<>();

            // like 검색으로 바꾸어 여러명의 사용자를 반환하도록 바꿀 수 있으므로 list로 반환할 예정임.
            if (userEntity != null && !userEntity.getEmail().equals(email)) {


                SearchUserObj user = SearchUserObj.builder()
                        .email(userEntity.getEmail())
                        .profileImg(userEntity.getProfileImg())
                        .nickname(userEntity.getNickname())
                        .build();

                list.add(user);
            }

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetSearchUserResponse.success(list);
    }

    @Override
    public ResponseEntity<? super ApiResponse<GetInvitationListResponse>> getInvitationList(String email) {
        List<InvitationInfo> list = null;
        try {
            String key = GlobalVariable.PREFIX_RECEIVER + email;

            String invitations = redisCacheService.findByKey(key, RedisDataBaseNum.INVITATION_MEMBER.getValue());

            InvitationList data = invitations != null ? new Gson().fromJson(invitations, InvitationList.class) : new InvitationList();

            list = new ArrayList<>();

            if (data.getList() != null && !data.getList().isEmpty()) {
                for (Integer dataKey : data.getList().keySet()) {
                    Set<InvitationInfo> inviters = data.getList().get(dataKey);

                    if (inviters == null) continue;

                    for (InvitationInfo invitationInfo : inviters) {
                        if (invitationInfo.getIsConfirm() == InvitationStatus.CONFIRM.getValue()) continue;
                        list.add(invitationInfo);
                    }

                }
            }


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return GetInvitationListResponse.success(list);
    }


    @Override
    public ResponseEntity<? super ApiResponse<ProfileImgUploadResponse>> patchProfileImg(String email, MultipartFile file) {
        String imageUrl = "";
        try {
            UserEntity user = userRepository.findByEmail(email);

            if (user == null) return ProfileImgUploadResponse.notExistUser();

            imageUrl = fileService.upload(file,email);

            user.setProfileImg(imageUrl);

            userRepository.save(user);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();

        }
        return ProfileImgUploadResponse.success(imageUrl);
    }

    @Override
    public ResponseEntity<? super ApiResponse<PatchNicknameResponse>> patchNickname(String email, PatchNicknameRequest req) {
        String changedNickname = req.getNickname();
        try {
            UserEntity user = userRepository.findByEmail(email);

            if (user == null) return PatchNicknameResponse.notExistUser();

            user.setNickname(req.getNickname());

            userRepository.save(user);


        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchNicknameResponse.success(changedNickname);
    }

    @Override
    public ResponseEntity<? super ApiResponse<PatchPasswordResponse>> patchPassword(String email, PatchPasswordRequest req) {
        try {
            UserEntity user = userRepository.findByEmail(email);

            if (user == null) return PatchPasswordResponse.notExistUser();

            // 비밀번호 불일치의 경우.
            if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) return PatchPasswordResponse.passwordNotMatched();

            user.setPassword(passwordEncoder.encode(req.getPasswordToChange()));

            userRepository.save(user);

        }catch (Exception e){
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(),Utils.getStackTrace(e));
            return ResponseDto.initialServerError();
        }
        return PatchPasswordResponse.success();
    }
}
