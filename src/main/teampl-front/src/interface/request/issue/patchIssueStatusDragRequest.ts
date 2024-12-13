export default interface PatchIssueStatusDragRequest {
    projectNum :number,
    issueNum : number,
    dstStat: number,
    dstPreNode: string | null,
    dstNextNode : string | null
}