import {Project} from "../interface/types";
import {create} from "zustand/react";

interface PersonalPrj {
    projects: Project[],
    setProjects: (project: Project[]) => void;
}


//* 개인 프로젝트의 상태
const personalPrjStore = create<PersonalPrj>(setState => ({
    projects: [],
    setProjects: item => setState({projects: item})
}));

export default personalPrjStore;

//() => ({}}   객체의 암묵적 반환에 대한 문법임*/