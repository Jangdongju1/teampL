interface IssueInfo {
    email: string,
    title: string,
    priority: number,
    stat: number,
    inCharge: string | null,
    subIssueCnt: number,
    commentCnt: number
}

const issueCardMock: IssueInfo[] | null = [
    {
        email: "jdj881204",
        title: "테스트이슈입니다.",
        inCharge: null,
        stat: 0,
        priority: 0,
        commentCnt: 3,
        subIssueCnt: 3
    }
]
export default issueCardMock;