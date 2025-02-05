package com.persnal.teampl.extendclass.oauth;

import com.persnal.teampl.common.commonclass.OAuth2UserInfo;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String socialId() {
        return (String)super.attributes.get("sub");
    }

    @Override
    public String getEmail() {
        return (String)super.attributes.get("email");
    }
}
