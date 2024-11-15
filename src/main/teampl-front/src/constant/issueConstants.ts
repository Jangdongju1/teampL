import {IssueCategory, IssuePriority, IssueStatus} from "../common";

// 이슈의 카테고리를 정의해 놓음
export const IssueCategories: { [key: string]: string } = {
    [IssueCategory.BUG_FIX]: "Bug fix",
    [IssueCategory.NEW_DEVELOPMENT]: "New Dev",
    [IssueCategory.TEST]: "Test Req",
    [IssueCategory.FEATURE_ENHANCEMENT]: "Feature Enhancement",
    [IssueCategory.PERFORMANCE_IMPROVE]: "Performance Improvement",
    [IssueCategory.ETC]: "기타"
}
// 이슈의 우선순위별 배경색에 대한 css를 정의해 놓음
export const IssuePriorities: { [key: string]: { text: string, color: string } } = {
    [IssuePriority.NORMAL]: {text: "Normal", color: "#e8e8e8"},
    [IssuePriority.LONG_TERM]: {text: "Long Term", color: "#4A90E2"},
    [IssuePriority.URGENT]: {text: "Urgent", color: "#F5A623"},
    [IssuePriority.VERY_URGENT]: {text: "Very Urgent", color: "#D0021B"}
}

export const IssueStats : {[key:string] : {text:string, color:string}} = {
    [IssueStatus.NOT_START]: {text: "Not Start", color: "rgb(121, 126, 147)"},
    [IssueStatus.ON_WORKING]: {text: "On Working", color: "rgb(253, 188, 100)"},
    [IssueStatus.STUCK]: {text: "Stuck", color: "rgb(232, 105, 125)"},
    [IssueStatus.DONE]: {text: "Done", color: "rgb(51, 211, 145)"}
}



