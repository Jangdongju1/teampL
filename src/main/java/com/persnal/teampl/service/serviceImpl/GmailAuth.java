package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.dto.respose.auth.SignUpResponse;
import com.persnal.teampl.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class GmailAuth implements OAuthService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());
    private final MailSender mailSender;


    @Override
    public ResponseEntity<? super SignUpResponse> sendAuthentication(String email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            String title = "TeamPL에 오신 것을 환영합니다.";
            String link = "";

            message.setTo(email);
            message.setSubject(title);
            message.setText("아래의 링크를 클릭하시고  비밀번호를 설정해 주세요. \n" + link);

            mailSender.send(message);
        } catch (MailSendException e) {
            logger.info(e.getMessage());
        }

        return null;
    }
}
