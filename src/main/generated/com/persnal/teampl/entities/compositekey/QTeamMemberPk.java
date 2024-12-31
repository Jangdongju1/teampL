package com.persnal.teampl.entities.compositekey;

import com.persnal.teampl.entities.compositeKey.TeamMemberPk;
import com.querydsl.core.types.PathMetadataFactory;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;

public class QTeamMemberPk extends EntityPathBase<TeamMemberPk> {
    public static final QTeamMemberPk teamMemberPk = new QTeamMemberPk("teamMemberPk");
    public final StringPath email = createString("email");
    public final NumberPath<Integer> regNum = createNumber("regNum", Integer.class);


    public QTeamMemberPk(String variable) {
        super(TeamMemberPk.class, PathMetadataFactory.forVariable(variable));
    }
}
