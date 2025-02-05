package com.persnal.teampl.dto.oauth;

import com.persnal.teampl.common.Enum.etc.SocialType;
import com.persnal.teampl.common.commonclass.OAuth2UserInfo;
import com.persnal.teampl.util.OauthUtils;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuth2Attributes {

    private final String userInfoKey;  // 사용자의 정보가 담겨있는 key값
    private final OAuth2UserInfo userInfo;

    @Builder
    public OAuth2Attributes(String userInfoKey, OAuth2UserInfo userInfo) {
        this.userInfoKey = userInfoKey;
        this.userInfo = userInfo;
    }

    // OAuth2Attributes 객세를 생성해서 반환하는 부분.
    public static OAuth2Attributes of(SocialType type, String userInfoKey, Map<String, Object> attributes){
        return OAuth2Attributes.builder()
                .userInfoKey(userInfoKey)
                .userInfo(OauthUtils.getOauth2UserInfo(type, attributes))
                .build();
    }

}
