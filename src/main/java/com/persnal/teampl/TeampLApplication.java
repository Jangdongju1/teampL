package com.persnal.teampl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
public class TeampLApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeampLApplication.class, args);
    }

}
