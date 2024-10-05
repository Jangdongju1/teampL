package com.persnal.teampl.jwt;

import com.persnal.teampl.jwt.webTokenModule.WebToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
@PropertySource("classpath:application.yml")
public class PasswordRegistrationJWTProvider implements WebToken {

    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Value("${secret.key}")
    private String key;
    private SecretKey SECRET_KEY;


    @PostConstruct
    @Override
    public void init() {
        SECRET_KEY = Keys.hmacShaKeyFor(key.getBytes());  // key 값 자체는 인코딩된 문자열이 아님.
    }

    @Override
    public String createWebToken(String email) {
        String token = "";
        try {
            Date expireDate = Date.from(Instant.now().plus(300, ChronoUnit.SECONDS));
            token = Jwts.builder()
                    .subject(email)
                    .issuedAt(Date.from(Instant.now()))  // 발행시간
                    .expiration(expireDate) // 만료일시
                    .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                    .compact();

        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        return token;
    }

    @Override
    public String getSubject(String token) {
        String subject = "";
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            subject = claims.getSubject();

        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return subject;
    }

    @Override
    public boolean validationWebToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            boolean isExpired = claims.getExpiration().before(Date.from(Instant.now()));

            if (isExpired) return false;

        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return false;
    }
}
