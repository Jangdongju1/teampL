// 프로젝트 객체

// 프로젝트 객체
export type Project = {
    projectNum: number,//
    regNum: number | null,//
    projectName: string,
    description: string,//
    createDate: string,
    creator: string,
    stat: number,
    projectType: number,//
    // -----------------
    teamName: string | null, // 팀의 이름
    totalIssueCnt: number,  // 처리된 이슈의 갯수
    processed: number, // 미처리의 이슈의 갯수
    // id: number
}

// 이슈객체
export type Issue = {
    issueNum: number,
    projectNum: number,
    email: string,
    title: string,
    content: string,
    inCharge: string,
    priority: number,
    writeDate: string,
    expireDate: string,
    stat: number,
    category: number,
    issueSequence: string,
    previousNode: string | null,
    nextNode: string | null,
}

// 이슈에 대한 코멘트 정의
export type IssueComment = {
    email: string,
    picture: string | null
    commentNum: number
    issueNum: number,
    content: string,
    writeDate: string,
    commentLevel: number,
    commentGroup: number,
    commentOrder: number
}

// Team 객체
export type Team = {
    regNum: number,
    teamName: string,
    sequence: string,
    email: string,
    createDate: string,
    description: string,
    projects: number,
    members: number,
}
export type TeamInfo = {
    teamName: string,
    creator: string,
    description: string,
    sequence: string
}

// Team Table 제공용 객체
export type TeamTableData = {
    id: number
    regNum: number,
    teamName: string,
    sequence: string,
    creator: string,
    createDate: string,
    projects: number,
    members: number,
}

// Project Table 제공용 객체
export type ProjectTableData = {
    projectNum: number,//
    regNum: number | null,//
    projectName: string,
    description: string,//
    createDate: string,
    creator: string,
    stat: number,
    projectType: number,//
    // -----------------
    teamName: string | null, // 팀의 이름
    processed: number, // 미처리의 이슈의 갯수
    unProcessed: number,
    id: number
}
// 팀원 검색에 대한 결과를 받아올 객체
export type SearchUser = {
    email : string,
    profileImg : string | null,
    nickname : string | null
}

export type TeamMember = {
    regNum : number,
    email : string,
    nickname : string | null,
    profileImg : string | null,
    teamName : string
}

