package com.persnal.teampl.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserEntity is a Querydsl query type for UserEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserEntity extends EntityPathBase<UserEntity> {

    private static final long serialVersionUID = 1466446238L;

    public static final QUserEntity userEntity = new QUserEntity("userEntity");

    public final StringPath email = createString("email");

    public final StringPath groupName = createString("groupName");

    public final SetPath<IssueCommentEntity, QIssueCommentEntity> issueCommentEntities = this.<IssueCommentEntity, QIssueCommentEntity>createSet("issueCommentEntities", IssueCommentEntity.class, QIssueCommentEntity.class, PathInits.DIRECT2);

    public final SetPath<IssueEntity, QIssueEntity> issueEntities = this.<IssueEntity, QIssueEntity>createSet("issueEntities", IssueEntity.class, QIssueEntity.class, PathInits.DIRECT2);

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath profileImg = createString("profileImg");

    public final SetPath<ProjectEntity, QProjectEntity> projectEntities = this.<ProjectEntity, QProjectEntity>createSet("projectEntities", ProjectEntity.class, QProjectEntity.class, PathInits.DIRECT2);

    public final StringPath role = createString("role");

    public QUserEntity(String variable) {
        super(UserEntity.class, forVariable(variable));
    }

    public QUserEntity(Path<? extends UserEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserEntity(PathMetadata metadata) {
        super(UserEntity.class, metadata);
    }

}

