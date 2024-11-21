import {create} from "zustand/react";

interface IssueInfo {
    issueNum : number | undefined
    setIssueNum : (issueNum: number) => void
}

const issueStore  = create<IssueInfo>(setState => ({
    issueNum : undefined,
    setIssueNum : newIssueNum => setState({issueNum : newIssueNum})
}));

export default issueStore;