package com.persnal.teampl.common.commonclass;

import java.util.Map;

// google, naver등 social마다 데이터의 형태가 다르므로 분기 처리를위해 구현할 부모 클래스를 만들어준다
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }


    public abstract String socialId();
    public abstract String getEmail();

}
