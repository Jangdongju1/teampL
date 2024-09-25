package com.persnal.teampl;

import jakarta.annotation.security.DenyAll;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class TeampLApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeampLApplication.class, args);
    }

}
