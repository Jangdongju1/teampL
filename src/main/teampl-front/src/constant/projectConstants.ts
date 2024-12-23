import {ProjectStatus, ProjectType} from "../common";
import projectStatus from "../common/enum/projectStatus";

// 프로젝트 타입에 따른 상태 명칭 반환 함수
export const getProjectType = (type: number) => {
    const types: Record<string, string> = {
        [ProjectType.PERSONAL_PROJECT] : "Personal",
        [ProjectType.TEAM_PROJECT] : "Team"
    }
    return types[String(type)];
}

// 프로젝트 상태에 따른 상태 명칭과 css색상을 반환하는 함수
export const getProjectStatus = (status : number) =>{
    const stats : Record<string, { name: string, color: string }> = {
        [ProjectStatus.ON_WORKING] : {name: "진행중", color : "rgb(253, 188, 100)"},
        [projectStatus.DONE] : { name : "완료", color : "rgb(51, 211, 145)"}
    }

    return stats[String(status)];
}

