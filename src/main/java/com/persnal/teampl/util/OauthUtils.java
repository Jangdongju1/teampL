package com.persnal.teampl.util;

import com.persnal.teampl.common.Enum.etc.SocialType;
import com.persnal.teampl.common.commonclass.OAuth2UserInfo;
import com.persnal.teampl.extendclass.oauth.GoogleOAuth2UserInfo;
import com.persnal.teampl.extendclass.oauth.NaverOAuth2UserInfo;

import java.util.Map;

public class OauthUtils {

    public static SocialType getSocialType(String registrationId){
        return switch (registrationId) {
            case "GOOGLE" -> SocialType.GOOGLE;
            case "NAVER" -> SocialType.NAVER;
            default -> SocialType.UNKOWN;
        };

    }

    // 추상클레스의 구체화 클래스를 반환하는 메서드
    public static OAuth2UserInfo getOauth2UserInfo(SocialType type, Map<String,Object> attributes){
        return switch (type){
            case GOOGLE -> new GoogleOAuth2UserInfo(attributes);
            case NAVER -> new NaverOAuth2UserInfo(attributes);
            default -> null;
        };
    }

}
