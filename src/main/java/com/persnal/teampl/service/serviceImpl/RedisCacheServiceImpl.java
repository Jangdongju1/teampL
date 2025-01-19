package com.persnal.teampl.service.serviceImpl;

import com.google.gson.Gson;
import com.persnal.teampl.common.Enum.redis.RedisDataBaseNum;
import com.persnal.teampl.common.Enum.team.InvitationStatus;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.config.Redis.RedisConfig;
import com.persnal.teampl.vo.invitation.InvitationInfo;
import com.persnal.teampl.vo.invitation.InvitationList;
import com.persnal.teampl.dto.request.team.RegistrationMemberRequest;
import com.persnal.teampl.service.RedisCacheService;
import com.persnal.teampl.util.Utils;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RedisCacheServiceImpl implements RedisCacheService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${token.expire.auth-code-token}")
    private int cacheDataExpireTime;

    private final RedisConfig config;

    private Map<Integer, RedisTemplate<String, Object>> templates;


    @PostConstruct
    public void init() {
        RedisTemplate<String, Object> auth = config.redisTemplate(RedisDataBaseNum.AUTH_CODE.getValue());
        RedisTemplate<String, Object> invitation = config.redisTemplate(RedisDataBaseNum.INVITATION_MEMBER.getValue());
        templates = new HashMap<>();
        templates.put(RedisDataBaseNum.AUTH_CODE.getValue(), auth);
        templates.put(RedisDataBaseNum.INVITATION_MEMBER.getValue(), invitation);

    }

    @Override
    public void authCodeCache(String key, String value) {
        // Redis Template사용시 커넥션은 자동반환이 된다고한다.
        templates.get(RedisDataBaseNum.AUTH_CODE.getValue()).opsForValue().set(key, value, Duration.ofSeconds(cacheDataExpireTime));
    }

    @Override
    public boolean isExistKey(String email, int database) {

        return templates.get(database).hasKey(email);
    }

    @Override
    public String findByKey(String key, int database) {
        return (String) templates.get(database).opsForValue().get(key);
    }

    @Override
    public void invitationCache(InvitationInfo info, Set<String> members) {
        try {

            RedisTemplate<String, Object> template = templates.get(RedisDataBaseNum.INVITATION_MEMBER.getValue());

            String key = GlobalVariable.PREFIX_SENDER + info.getEmail();


            // sender 저장
            updateSenderList(key, members, template, info);

            //  receiver 저장.
            for (String member : members) {
                key = GlobalVariable.PREFIX_RECEIVER + member;
                updateReceiverList(key, info, template);
            }
        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
        }


    }

    private void updateSenderList(String key, Set<String> members, RedisTemplate<String, Object> template, InvitationInfo info) {
        try {
            String value = findByKey(key, RedisDataBaseNum.INVITATION_MEMBER.getValue());

            InvitationList list = value != null ? new Gson().fromJson(value, InvitationList.class) : new InvitationList();
            Map<Integer, Set<InvitationInfo>> receives = value != null ? list.getList() : new HashMap<>();
            Set<InvitationInfo> receivers = null;

            receivers = receives.getOrDefault(info.getRegNum(), new HashSet<>());

            for (String member : members) {
                InvitationInfo newReceiverInfo = (InvitationInfo) info.clone();
                newReceiverInfo.setEmail(member);

                receivers.add(newReceiverInfo);
            }


            receives.put(info.getRegNum(), receivers);

            list.setList(receives);

            String newValue = new Gson().toJson(list);

            template.opsForValue().set(key, newValue);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }

    }

    private void updateReceiverList(String key, InvitationInfo info, RedisTemplate<String, Object> template) {
        try {
            String value = findByKey(key, RedisDataBaseNum.INVITATION_MEMBER.getValue());

            InvitationList list = value != null ? new Gson().fromJson(value, InvitationList.class) : new InvitationList();
            Map<Integer, Set<InvitationInfo>> invites = value != null ? list.getList() : new HashMap<>();
            Set<InvitationInfo> inviters = null;


            inviters = invites.getOrDefault(info.getRegNum(), new HashSet<>());

            inviters.add(info);

            invites.put(info.getRegNum(), inviters);

            list.setList(invites);

            String newValue = new Gson().toJson(list);


            template.opsForValue().set(key, newValue);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
    }

    @Override
    public void registrationMemberCache(String email, RegistrationMemberRequest req) {
        try {

            RedisTemplate<String, Object> template = templates.get(RedisDataBaseNum.INVITATION_MEMBER.getValue());
            String key = GlobalVariable.PREFIX_RECEIVER + email;  // 레디스 검색키
            String value = findByKey(key, RedisDataBaseNum.INVITATION_MEMBER.getValue());

            InvitationList list = null;
            if (value != null) {
                list = new Gson().fromJson(value, InvitationList.class);
                Map<Integer, Set<InvitationInfo>> invites = list.getList();
                Set<InvitationInfo> data = invites.get(req.getRegNum());

                if (data != null) {
                    for (InvitationInfo info : data) {
                        // InvitationInfo 클래스의 equals가 오버라이딩 되어잇다.  따라서 아래의 조건을 만족하는 요소는 오롯이 1개 일 것이다.
                        if (info.getEmail().equals(req.getCreator()) && info.getRegNum() == req.getRegNum()) {
                            info.setIsConfirm(InvitationStatus.CONFIRM.getValue());
                            break;
                        }

                    }
                }
            }

            String newValue = new Gson().toJson(list);
            template.opsForValue().set(key, newValue);


        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
    }
}
