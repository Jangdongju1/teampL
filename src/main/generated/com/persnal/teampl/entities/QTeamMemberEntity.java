package com.persnal.teampl.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamMemberEntity is a Querydsl query type for TeamMemberEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamMemberEntity extends EntityPathBase<TeamMemberEntity> {

    private static final long serialVersionUID = 510091306L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamMemberEntity teamMemberEntity = new QTeamMemberEntity("teamMemberEntity");

    public final BooleanPath isWithdrawal = createBoolean("isWithdrawal");

    public final NumberPath<Integer> position = createNumber("position", Integer.class);

    public final com.persnal.teampl.entities.compositeKey.QTeamMemberPk teamMemberPk;

    public final NumberPath<Integer> teamRole = createNumber("teamRole", Integer.class);

    public QTeamMemberEntity(String variable) {
        this(TeamMemberEntity.class, forVariable(variable), INITS);
    }

    public QTeamMemberEntity(Path<? extends TeamMemberEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamMemberEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamMemberEntity(PathMetadata metadata, PathInits inits) {
        this(TeamMemberEntity.class, metadata, inits);
    }

    public QTeamMemberEntity(Class<? extends TeamMemberEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.teamMemberPk = inits.isInitialized("teamMemberPk") ? new com.persnal.teampl.entities.compositeKey.QTeamMemberPk(forProperty("teamMemberPk")) : null;
    }

}

