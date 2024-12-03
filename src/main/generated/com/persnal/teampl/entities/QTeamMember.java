package com.persnal.teampl.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTeamMember is a Querydsl query type for TeamMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamMember extends EntityPathBase<TeamMember> {

    private static final long serialVersionUID = -1400800921L;

    public static final QTeamMember teamMember = new QTeamMember("teamMember");

    public final BooleanPath isWithdrawal = createBoolean("isWithdrawal");

    public final NumberPath<Integer> position = createNumber("position", Integer.class);

    public final SimplePath<com.persnal.teampl.entities.compositeKey.TeamMemberPk> teamMemberPk = createSimple("teamMemberPk", com.persnal.teampl.entities.compositeKey.TeamMemberPk.class);

    public final NumberPath<Integer> teamRole = createNumber("teamRole", Integer.class);

    public QTeamMember(String variable) {
        super(TeamMember.class, forVariable(variable));
    }

    public QTeamMember(Path<? extends TeamMember> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeamMember(PathMetadata metadata) {
        super(TeamMember.class, metadata);
    }

}

