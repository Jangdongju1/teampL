package com.persnal.teampl.service.userdetailsService;

import com.persnal.teampl.dto.userDetails.CustomUserDetails;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;


    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(username);
//        if (userEntity != null) {
//            return new CustomUserDetails(userEntity);
//        }
        return userEntity != null ? new CustomUserDetails(userEntity) : null;
    }

}
