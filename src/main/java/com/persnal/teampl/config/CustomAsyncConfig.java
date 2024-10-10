package com.persnal.teampl.config;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class CustomAsyncConfig implements AsyncConfigurer {
    private final ThreadPoolTaskExecutor executor;

    // Value 어노테이션은 주로 클래스가 초기화 된 이후에 값을 주입한다.
    @Value("${custom.thread-pool.core-pool-size}")
    private int corePoolSize;

    @Value("${custom.thread-pool.max-pool-size}")
    private int maxPoolSize;

    @Value("${custom.thread-pool.queue-capacity}")
    private int queueCapacity;

    public CustomAsyncConfig() {
        this.executor = new ThreadPoolTaskExecutor();
    }

    @PostConstruct
    public void init(){
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setThreadNamePrefix("EmailAuth-Executor-");
        executor.initialize();
    }


    @Override
    public Executor getAsyncExecutor() {
        return executor;
    }

    @PreDestroy
    public void shutDown() {
        executor.shutdown();
    }
}
