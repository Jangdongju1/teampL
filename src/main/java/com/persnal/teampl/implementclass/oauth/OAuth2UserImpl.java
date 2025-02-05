package com.persnal.teampl.implementclass.oauth;

import com.persnal.teampl.entities.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
public class OAuth2UserImpl extends DefaultOAuth2User {

    private final UserEntity user;


    public OAuth2UserImpl(Collection<? extends GrantedAuthority> authorities,
                          Map<String, Object> attributes,
                          String nameAttributeKey,
                          UserEntity user) {
        super(authorities, attributes, nameAttributeKey);
        this.user = user;

    }


//    public UserEntity getUser(){
//        return user;
//    }
}
