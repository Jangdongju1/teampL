// 프로젝트 객체
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
    projectNum: number,
    email: string,
    title: string,
    content: string,
    inCharge: string,
    priority: number,
    writeDate: string,
    expireDate: string,
    stat: number,
    category: string,
    isAssigned: boolean,
    isDeleted: boolean
}
