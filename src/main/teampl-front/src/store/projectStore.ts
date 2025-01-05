    import {ProjectTableData} from "../interface/types";
import {create} from "zustand/react";

interface PersonalPrj {
    projects: { projects: ProjectTableData[], personal: ProjectTableData[], team: ProjectTableData[] },
    setProjects: (newProjects: { projects?: ProjectTableData[], personal: ProjectTableData[], team: ProjectTableData[]}) => void;
}


//* 개인 프로젝트의 상태  > 프로젝트 생성 모달창이 있기 때문에 컴포넌트간 데이터 공유를 위해서 생성함.
const projectStore = create<PersonalPrj>(setState => ({
    projects: {projects: [], personal: [], team: []},
    setProjects: newValue =>setState(pre => ({

        projects : {
            ...pre.projects,
            ...newValue
        }
    }))


}));

export default projectStore;

//() => ({})   객체의 암묵적 반환에 대한 문법임*/