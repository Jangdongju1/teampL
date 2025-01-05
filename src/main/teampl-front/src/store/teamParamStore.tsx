import {create} from "zustand/react";

interface TeamRegNum {
    teamNumber: number | null,
    setTeamNumber: (newNumber: number | null) => void
}

const teamParamStore = create<TeamRegNum>(setState => ({
    teamNumber: null,
    setTeamNumber: newNumber => setState(pre => ({
        ...pre,
        teamNumber : newNumber
    }))
}))

export default teamParamStore;