import {create} from "zustand/react";

interface IssueInfo {
    issueNum : number | undefined
    setIssueNum : (issueNum: number) => void
}
// 이슈카드 <---> 이슈모달 상호간 데이터 조회를 위한 전역 상태.
const issueStore  = create<IssueInfo>(setState => ({
    issueNum : undefined,
    setIssueNum : newIssueNum => setState({issueNum : newIssueNum})
}));

export default issueStore;