import {create} from "zustand/react";
import {Team} from "../interface/types";

// 팀정보를 담는 전역상태 (사용위치 : 팀페이지)
interface TeamInfo {
    teams: Team[]
    setTeams: (newTeams: Team[]) => void;
}



const teamStore = create<TeamInfo> (setState => ({
    teams : [],
    setTeams: newTeams => setState(state => ({
        ...state,
        teams : newTeams
    }))

}))

export default teamStore;