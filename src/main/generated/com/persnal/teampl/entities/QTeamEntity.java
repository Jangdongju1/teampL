package com.persnal.teampl.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamEntity is a Querydsl query type for TeamEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamEntity extends EntityPathBase<TeamEntity> {

    private static final long serialVersionUID = -1621306704L;

    public static final QTeamEntity teamEntity = new QTeamEntity("teamEntity");

    public final StringPath createDate = createString("createDate");

    public final StringPath description = createString("description");

    public final StringPath email = createString("email");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final NumberPath<Integer> jobNum = createNumber("jobNum", Integer.class);

    public final SetPath<ProjectEntity, QProjectEntity> projectEntities = this.<ProjectEntity, QProjectEntity>createSet("projectEntities", ProjectEntity.class, QProjectEntity.class, PathInits.DIRECT2);

    public final NumberPath<Integer> regNum = createNumber("regNum", Integer.class);

    public final StringPath Sequence = createString("Sequence");

    public final StringPath teamName = createString("teamName");

    public QTeamEntity(String variable) {
        super(TeamEntity.class, forVariable(variable));
    }

    public QTeamEntity(Path<? extends TeamEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeamEntity(PathMetadata metadata) {
        super(TeamEntity.class, metadata);
    }

}

