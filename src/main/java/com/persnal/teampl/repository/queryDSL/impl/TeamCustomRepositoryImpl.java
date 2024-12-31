package com.persnal.teampl.repository.queryDSL.impl;

import com.persnal.teampl.repository.queryDSL.TeamCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TeamCustomRepositoryImpl implements TeamCustomRepository {
    private final JPAQueryFactory queryFactory;
}
