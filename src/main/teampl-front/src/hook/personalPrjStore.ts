import {Project} from "../interface/types";

interface PersonalPrj {
    projects: Project[],
    setProjects: (project: Project[]) => void;
}