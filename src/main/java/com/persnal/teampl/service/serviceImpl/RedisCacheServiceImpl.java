package com.persnal.teampl.service.serviceImpl;

import com.google.gson.Gson;
import com.persnal.teampl.common.Enum.redis.RedisDataBaseNum;
import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.config.Redis.RedisConfig;
import com.persnal.teampl.dto.obj.invitation.InvitationInfo;
import com.persnal.teampl.dto.obj.invitation.InvitationList;
import com.persnal.teampl.dto.request.team.InvitationMemberRequest;
import com.persnal.teampl.service.RedisCacheService;
import com.persnal.teampl.util.Utils;
import jakarta.annotation.PostConstruct;
import jdk.jshell.execution.Util;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
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
    public void invitationCache(String email, InvitationMemberRequest req) {
        try {
            String INVITATION_CACHE_PREFIX_SENT = "Sent:";
            String INVITATION_CACHE_PREFIX_RECEIVE = "Receive:";

            RedisTemplate<String, Object> template = templates.get(RedisDataBaseNum.INVITATION_MEMBER.getValue());

            handleInvitationRequest(template, INVITATION_CACHE_PREFIX_SENT, email, req, true, email);


            for (String member : req.getMembers()) {
                handleInvitationRequest(template, INVITATION_CACHE_PREFIX_RECEIVE, member, req, false, email);
            }
        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
        }


    }


    private void updateSenderList(InvitationList currentList, InvitationMemberRequest req) {
        try {
            Map<Integer, InvitationInfo> list = currentList.getList();

            // 프로젝트에서 초대했던 이력이 존재하지 않는 경우
            if (list != null) {
                //list = new HashMap<>();

                InvitationInfo currentReceiverInfo = currentList.getList().get(req.getRegNum());

                if (currentReceiverInfo == null) {
                    InvitationInfo receiverInfo = InvitationInfo.getReceiverInfo(req);

                    list.put(req.getRegNum(), receiverInfo);
                } else {
                    Set<InvitationInfo.MemberInfo> receivers = currentReceiverInfo.getMembers();

                    for (String receiver : req.getMembers()) {
                        InvitationInfo.MemberInfo ele = InvitationInfo.createMember(receiver, LocalDateTime.now().toString());
                        receivers.add(ele);
                    }
                }

            } else {
                list = new HashMap<>();

                InvitationInfo newInfo = InvitationInfo.getReceiverInfo(req);

                list.put(req.getRegNum(), newInfo);

                currentList.setList(list);

            }
        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }

    }

    private void updateReceiverList(InvitationList currentList, InvitationMemberRequest req, String email) {
        try {
            Map<Integer, InvitationInfo> list = currentList.getList();

            InvitationInfo.MemberInfo inviter = InvitationInfo.createMember(email, LocalDateTime.now().toString());

            if (list != null) {
                InvitationInfo currentInvitorInfo = list.get(req.getRegNum());

                if (currentInvitorInfo == null) {
                    Set<InvitationInfo.MemberInfo> inviters = new HashSet<>();


                    inviters.add(inviter);

                    InvitationInfo inviterInfo = InvitationInfo.builder()
                            .regNum(req.getRegNum())
                            .members(inviters)
                            .build();


                    list.put(req.getRegNum(), inviterInfo);

                } else {
                    Set<InvitationInfo.MemberInfo> inviters = currentInvitorInfo.getMembers();
                    inviters.add(inviter);
                }
            } else {
                list = new HashMap<>();


                Set<InvitationInfo.MemberInfo> inviters = new HashSet<>();

                inviters.add(inviter);

                InvitationInfo newInfo = InvitationInfo.builder()
                        .regNum(req.getRegNum())
                        .members(inviters)
                        .build();

                list.put(req.getRegNum(), newInfo);

                currentList.setList(list);
            }
        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
    }

    private void handleInvitationRequest(RedisTemplate<String, Object> template, String prefix, String keyVal, InvitationMemberRequest req, boolean isSent, String inviter) {
        try {
            String key = prefix + keyVal;
            String existData = findByKey(key, RedisDataBaseNum.INVITATION_MEMBER.getValue());

            InvitationList currentList = (existData != null) ? new Gson().fromJson(existData, InvitationList.class) : new InvitationList();  // 기존의 이력이 없는경우에는 새로운 객체를 넘긴다.

            if (isSent) {
                updateSenderList(currentList, req);
            } else {
                updateReceiverList(currentList, req, inviter);
            }

            String value = new Gson().toJson(currentList);
            template.opsForValue().set(key, value);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), Utils.getStackTrace(e));
        }

    }


}
