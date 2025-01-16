// 개인 또는 팀프로젝트의 칸반보드에서  프로젝트 리스트 모달을 띄울 대
// 해당 모달의 데이터를 담는 전역상태.

import {create} from "zustand/react";
import {Project} from "../interface/types";

interface PrjModalDataProps{
    prjModalData : Project[],
    setPrjModalData : (newProjects : Project[]) => void;
}


const prjListModalDataStore = create<PrjModalDataProps>(setState => ({
    prjModalData : [],
    setPrjModalData: newProjects =>  setState(pre => ({
        ...pre,
        prjModalData : newProjects
    }))
}))

export default prjListModalDataStore;
