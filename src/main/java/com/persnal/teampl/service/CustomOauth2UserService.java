package com.persnal.teampl.service;

import com.google.gson.Gson;
import com.persnal.teampl.common.Enum.etc.SocialType;
import com.persnal.teampl.common.Enum.user.UserRole;
import com.persnal.teampl.dto.oauth.OAuth2Attributes;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.implementclass.oauth.OAuth2UserImpl;
import com.persnal.teampl.repository.jpa.IssueRepository;
import com.persnal.teampl.repository.jpa.UserRepository;
import com.persnal.teampl.util.OauthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOauth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final IssueRepository issueRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 소셜에서 인증이 완료되는경우 요청정보 포함 인증정보를 리다이렉션  uri로 던져준다.

        // 인증 정보로부터 유저의 관련된 데이터를 객체를 가져오고
        OAuth2User oAuth2User = super.loadUser(userRequest);
        // 각각의 속성들은 Map 형태로 저장되어 있다.
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // 유저의 정보를가져올 수 있는 key값에 해당한다. 이 부분이 각각의 소셜마다 다르다고 한다.
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        // 소셜의 종류를 가져옴
        String social = userRequest.getClientRegistration().getRegistrationId();

        SocialType socialType = OauthUtils.getSocialType(social.toUpperCase());

        OAuth2Attributes oAuth2Attributes = OAuth2Attributes.of(socialType, userNameAttributeName, attributes);


        // 소셜 로그인에서 고유값은 1) socialType & socialId 이 두가지를 조합하면 된다.
        // 또한 자체 로그인기능을 가진 경우를 대비해서 userEntity의 고유값인 이메일로 먼저 조회를 할 것이다.
        String userEmail = oAuth2Attributes.getUserInfo().getEmail();
        String socialId = oAuth2Attributes.getUserInfo().socialId();

        UserEntity user = userRepository.findByEmail(userEmail);

        if (user == null) {
            String defaultNickName = userEmail.split("@")[0]; // 임시 닉네임 == 이메일 앞꼭다리
            user = UserEntity.builder()
                    .email(userEmail)
                    .nickname(defaultNickName)
                    .socialType(socialType.toString())
                    .socialId(socialId)
                    .role(UserRole.GUEST.getRole())
                    .build();
        }


        return new OAuth2UserImpl(Collections.singleton(new SimpleGrantedAuthority(user.getRole())),
                attributes,
                oAuth2Attributes.getUserInfoKey(),
                user);
    }


}
