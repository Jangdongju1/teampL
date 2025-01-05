import {Project, ProjectTableData} from "../interface/types";

export const getFormattedDate = (dateStr: string): string => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    // month는 0부터 시작하므로 +1 을해주고 .pad로 2자리 숫자를 맞추기 위해 앞에 0을 붙여줌.
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export const getFormattedDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0'); // 일은 두 자릿수로 맞추기

    return `${year}-${month}-${day}`;
}

// 테이블에 필요한 데이터를 만드는 함수
export const getTableData = (projectList: Project[]) => {
    return projectList.map(project => {
        const element: ProjectTableData = {
            projectNum: project.projectNum,
            regNum: project.regNum,
            projectName: project.projectName,
            description: project.description,
            createDate: project.createDate,
            creator: project.creator,
            teamName: project.teamName,
            stat: project.stat,
            projectType: project.projectType,
            processed: project.processed,
            unProcessed: (project.totalIssueCnt - project.processed),
            id: project.projectNum
        }
        return element;
    });
}