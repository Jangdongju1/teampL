package com.persnal.teampl.entities.compositeKey;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTeamMemberPk is a Querydsl query type for TeamMemberPk
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QTeamMemberPk extends BeanPath<TeamMemberPk> {

    private static final long serialVersionUID = 1926303672L;

    public static final QTeamMemberPk teamMemberPk = new QTeamMemberPk("teamMemberPk");

    public final StringPath email = createString("email");

    public final NumberPath<Integer> regNum = createNumber("regNum", Integer.class);

    public QTeamMemberPk(String variable) {
        super(TeamMemberPk.class, forVariable(variable));
    }

    public QTeamMemberPk(Path<? extends TeamMemberPk> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeamMemberPk(PathMetadata metadata) {
        super(TeamMemberPk.class, metadata);
    }

}

