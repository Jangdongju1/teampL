import {Project} from "../interface/types";
import {create} from "zustand/react";


// 특정 팀에 대한 프로젝트의 목록을 저장하는 전역상태.
interface TeamProject {
    projects: Project[],
    setProjects: (newProjects: Project[]) => void;
}

const teamProjectStore = create<TeamProject>(setState => ({
    projects: [],
    setProjects: newProjects => setState(() => ({
        projects: newProjects
    }))
}))

export default teamProjectStore;
