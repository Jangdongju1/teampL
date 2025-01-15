package com.persnal.teampl.repository.jpa;

import com.persnal.teampl.dto.obj.invitation.InvitationInfo;
import com.persnal.teampl.entities.UserEntity;
import com.persnal.teampl.repository.queryDSL.UserCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>, UserCustomRepository {
    boolean existsByEmail(String email);
    UserEntity findByEmail(String email);

    @Override
    InvitationInfo getInvitationInfo(String email, Integer regNum);
}
