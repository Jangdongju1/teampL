package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.service.MailAuthService;
import com.persnal.teampl.service.RedisCacheService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class GmailAuth implements MailAuthService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());
    private final JavaMailSender mailSender;
    private final RedisCacheService redisCache;


    @Async
    @Override
    public void sendAuthentication(String email) {
        try {
            MimeMessage message = createAuthMsg(email);
            mailSender.send(message);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), e.getMessage());
        }
    }

    private String generateAuthenticationCode() {
        int code = (int) (Math.random() * 1000000);
        return String.format("%06d", code);
    }

    private MimeMessage createAuthMsg(String email) {
        MimeMessage message = null;
        try {
            message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            String code = generateAuthenticationCode();
            String title = "TeamPL에 오신 것을 환영합니다.";
            String content = "";

            content += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            content += "<h1>" + code + "</h1>";
            content += "<h3>" + "감사합니다." + "</h3>";


            helper.setTo(email);
            helper.setSubject(title);
            helper.setText(content, true);

            // redis cache
            redisCache.authCodeCache(email,code);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, getClass().getName(), e.getMessage());
        }
        return message;
    }
}
