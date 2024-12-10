// 프로젝트 객체
import {IssueStatus} from "../common";

export type Project = {
    projectNum: number,
    regNum: number | null,
    projectName: string,
    description: string,
    createDate: string,
    creator: string,
    stat: number,
    projectType: number
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
    ref: string,
    issueSequence: string,
    isFirstIssue: boolean
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

export type KanbanState = {
    status: IssueStatus,
    setState: (issues: Issue[]) => void;
}

