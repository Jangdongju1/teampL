package com.persnal.teampl.config;

import jakarta.annotation.PreDestroy;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class CustomAsyncConfig implements AsyncConfigurer {
    private final ThreadPoolTaskExecutor executor;

    public CustomAsyncConfig() {
        this.executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(100);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("EmailAuth-Executor-");
        executor.initialize();
    }


    @Override
    public Executor getAsyncExecutor() {
        return executor;
    }

    @PreDestroy
    public void shutDown(){
        executor.shutdown();
    }
}
