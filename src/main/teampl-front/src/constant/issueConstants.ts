import {IssueCategory, IssuePriority, IssueStatus, KanbanBoardName} from "../common";

// 이슈의 카테고리를 정의해 놓음
export const IssueCategories: { [key: string]: string } = {
    [IssueCategory.BUG_FIX]: "Bug fix",
    [IssueCategory.NEW_DEVELOPMENT]: "New Dev",
    [IssueCategory.TEST]: "Test Req",
    [IssueCategory.FEATURE_ENHANCEMENT]: "Feat. Enh.",
    [IssueCategory.PERFORMANCE_IMPROVE]: "Perf. Tuning",
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

// 이슈의 상태별 칸반의 이름을 반환해주는 객체
export const getKanbanName = (stat: number): string => {
    const names: Record<string, string> = {
        "0": KanbanBoardName.NOT_START,
        "1": KanbanBoardName.ON_WORKING,
        "2": KanbanBoardName.STUCK,
        "3": KanbanBoardName.DONE
    }
    return names[String(stat)];
}




