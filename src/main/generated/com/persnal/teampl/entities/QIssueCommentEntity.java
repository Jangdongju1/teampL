package com.persnal.teampl.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QIssueCommentEntity is a Querydsl query type for IssueCommentEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QIssueCommentEntity extends EntityPathBase<IssueCommentEntity> {

    private static final long serialVersionUID = 1680299225L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QIssueCommentEntity issueCommentEntity = new QIssueCommentEntity("issueCommentEntity");

    public final NumberPath<Integer> commentGroup = createNumber("commentGroup", Integer.class);

    public final NumberPath<Integer> commentLevel = createNumber("commentLevel", Integer.class);

    public final NumberPath<Integer> commentNum = createNumber("commentNum", Integer.class);

    public final NumberPath<Integer> commentOrder = createNumber("commentOrder", Integer.class);

    public final StringPath content = createString("content");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final QIssueEntity issueEntity;

    public final QUserEntity userEntity;

    public final StringPath writeDate = createString("writeDate");

    public QIssueCommentEntity(String variable) {
        this(IssueCommentEntity.class, forVariable(variable), INITS);
    }

    public QIssueCommentEntity(Path<? extends IssueCommentEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QIssueCommentEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QIssueCommentEntity(PathMetadata metadata, PathInits inits) {
        this(IssueCommentEntity.class, metadata, inits);
    }

    public QIssueCommentEntity(Class<? extends IssueCommentEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.issueEntity = inits.isInitialized("issueEntity") ? new QIssueEntity(forProperty("issueEntity"), inits.get("issueEntity")) : null;
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
    }

}

