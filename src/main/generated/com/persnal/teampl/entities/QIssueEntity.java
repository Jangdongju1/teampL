package com.persnal.teampl.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QIssueEntity is a Querydsl query type for IssueEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QIssueEntity extends EntityPathBase<IssueEntity> {

    private static final long serialVersionUID = 1153972748L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QIssueEntity issueEntity = new QIssueEntity("issueEntity");

    public final NumberPath<Integer> category = createNumber("category", Integer.class);

    public final StringPath content = createString("content");

    public final StringPath expireDate = createString("expireDate");

    public final StringPath inCharge = createString("inCharge");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final BooleanPath isFirstIssue = createBoolean("isFirstIssue");

    public final ListPath<IssueCommentEntity, QIssueCommentEntity> issueCommentEntities = this.<IssueCommentEntity, QIssueCommentEntity>createList("issueCommentEntities", IssueCommentEntity.class, QIssueCommentEntity.class, PathInits.DIRECT2);

    public final NumberPath<Integer> issueNum = createNumber("issueNum", Integer.class);

    public final StringPath issueSequence = createString("issueSequence");

    public final NumberPath<Integer> priority = createNumber("priority", Integer.class);

    public final QProjectEntity projectEntity;

    public final StringPath ref = createString("ref");

    public final NumberPath<Integer> stat = createNumber("stat", Integer.class);

    public final StringPath title = createString("title");

    public final QUserEntity userEntity;

    public final StringPath writeDate = createString("writeDate");

    public QIssueEntity(String variable) {
        this(IssueEntity.class, forVariable(variable), INITS);
    }

    public QIssueEntity(Path<? extends IssueEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QIssueEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QIssueEntity(PathMetadata metadata, PathInits inits) {
        this(IssueEntity.class, metadata, inits);
    }

    public QIssueEntity(Class<? extends IssueEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.projectEntity = inits.isInitialized("projectEntity") ? new QProjectEntity(forProperty("projectEntity"), inits.get("projectEntity")) : null;
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
    }

}

