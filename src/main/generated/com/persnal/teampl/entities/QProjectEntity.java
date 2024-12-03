package com.persnal.teampl.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProjectEntity is a Querydsl query type for ProjectEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProjectEntity extends EntityPathBase<ProjectEntity> {

    private static final long serialVersionUID = -123342772L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProjectEntity projectEntity = new QProjectEntity("projectEntity");

    public final StringPath createDate = createString("createDate");

    public final StringPath description = createString("description");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final StringPath projectName = createString("projectName");

    public final NumberPath<Integer> projectNum = createNumber("projectNum", Integer.class);

    public final NumberPath<Integer> projectType = createNumber("projectType", Integer.class);

    public final NumberPath<Integer> stat = createNumber("stat", Integer.class);

    public final QTeamEntity teamEntity;

    public final QUserEntity userEntity;

    public QProjectEntity(String variable) {
        this(ProjectEntity.class, forVariable(variable), INITS);
    }

    public QProjectEntity(Path<? extends ProjectEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProjectEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProjectEntity(PathMetadata metadata, PathInits inits) {
        this(ProjectEntity.class, metadata, inits);
    }

    public QProjectEntity(Class<? extends ProjectEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.teamEntity = inits.isInitialized("teamEntity") ? new QTeamEntity(forProperty("teamEntity")) : null;
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
    }

}

