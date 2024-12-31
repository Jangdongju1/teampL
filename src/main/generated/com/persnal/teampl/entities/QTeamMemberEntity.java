package com.persnal.teampl.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.persnal.teampl.entities.compositekey.QTeamMemberPk;
import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTeamMemberEntity is a Querydsl query type for TeamMemberEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamMemberEntity extends EntityPathBase<TeamMemberEntity> {

    private static final long serialVersionUID = 510091306L;

    public static final QTeamMemberEntity teamMemberEntity = new QTeamMemberEntity("teamMemberEntity");

    public final BooleanPath isWithdrawal = createBoolean("isWithdrawal");

    public final NumberPath<Integer> position = createNumber("position", Integer.class);

    public final QTeamMemberPk teamMemberPk = new QTeamMemberPk("teamMemberPk");

   // public final SimplePath<com.persnal.teampl.entities.compositeKey.TeamMemberPk> teamMemberPk = createSimple("teamMemberPk", com.persnal.teampl.entities.compositeKey.TeamMemberPk.class);

    public final NumberPath<Integer> teamRole = createNumber("teamRole", Integer.class);

    public QTeamMemberEntity(String variable) {
        super(TeamMemberEntity.class, forVariable(variable));
    }

    public QTeamMemberEntity(Path<? extends TeamMemberEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeamMemberEntity(PathMetadata metadata) {
        super(TeamMemberEntity.class, metadata);
    }

}

