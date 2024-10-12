package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.service.RedisCacheService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisServiceImpl implements RedisCacheService {

    private final RedisTemplate<String, Object> redisTemplate;
    private ValueOperations<String, Object> valueOperations;
    @Value("${token.expire.auth-code-token}")
    int cacheDataExpireTime;

    public RedisServiceImpl(@Qualifier("redisTempForCache") RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate; //생성자 주입

    }

    @PostConstruct
    private void init() {  // 초기화
        this.valueOperations = redisTemplate.opsForValue();
    }

    @Override
    public void authCodeCache(String key, String value) {
        // Duration.ofSeconds(expireTime) 만료시간
        valueOperations.set(key, value, Duration.ofSeconds(cacheDataExpireTime)); // 5분.
    }

    @Override
    public boolean isExistEmail(String email) {
        return redisTemplate.hasKey(email) != null;
    }

    @Override
    public String findCodeByEmail(String email) {
        return (String) valueOperations.get(email);
    }
}
