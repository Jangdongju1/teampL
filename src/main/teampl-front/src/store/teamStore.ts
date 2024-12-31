import {create} from "zustand/react";
import {Team} from "../interface/types";

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