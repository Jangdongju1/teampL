package com.persnal.teampl.config.Redis;

import io.lettuce.core.resource.DefaultClientResources;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnection;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettucePoolingClientConfiguration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Value("${spring.data.redis.host}")
    private String host;
    @Value("${spring.data.redis.port}")
    private int port;

    @Value("${spring.data.redis.lettuce.pool.max-active}")
    private int maxActive;
    @Value("${spring.data.redis.lettuce.pool.max-idle}")
    private int maxIdle;
    @Value("${spring.data.redis.lettuce.pool.min-idle}")
    private int minIdle;


    private LettuceConnectionFactory createConnectionFactory(int database) {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(host, port);
        config.setDatabase(database);

        // 커네션 풀 config
        GenericObjectPoolConfig<LettuceConnection> poolConfig = new GenericObjectPoolConfig();
        poolConfig.setMaxTotal(maxActive);
        poolConfig.setMaxIdle(maxIdle);
        poolConfig.setMinIdle(minIdle);

        LettucePoolingClientConfiguration clientConfig = LettucePoolingClientConfiguration.builder()
                .clientResources(DefaultClientResources.create())
                .poolConfig(poolConfig).build();



        return new LettuceConnectionFactory(config, clientConfig);
    }

    private RedisTemplate<String, Object> createRedisTemplate(int database) {
        LettuceConnectionFactory factory = createConnectionFactory(database);
        factory.start();
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        template.afterPropertiesSet();
        return template;
    }


    public RedisTemplate<String, Object> redisTemplate(int database) {
        return createRedisTemplate(database);  // 기본적으로 DB 0번을 사용
    }


}
