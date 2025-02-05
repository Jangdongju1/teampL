package com.persnal.teampl.extendclass.oauth;

import com.persnal.teampl.common.commonclass.OAuth2UserInfo;

import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String socialId() {
        return "";
    }

    @Override
    public String getEmail() {
        return "";
    }
}
