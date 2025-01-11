import {create} from "zustand/react";
import {Team} from "../interface/types";

// 모달 전달용 팀 정보 관련 global State
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