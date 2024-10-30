import {create} from "zustand/react";

interface HeaderMenu{
    teamBtnClickState : boolean,
    currentBtnClickState : boolean,
    personalPrjBtnClickState : boolean,

    setTeamBtnClickState : (state :boolean) => void,
    setCurrentBtnClickState :(state:boolean) =>void,
    setPersonalPrjBtnClickState : (state: boolean) =>void,

    // onMenuClick : (btnType: string) => void,
}

const headerMenuStore = create<HeaderMenu>(setState => ({
    teamBtnClickState : false,
    currentBtnClickState : false,
    personalPrjBtnClickState : false,

    setTeamBtnClickState : state => setState({teamBtnClickState : state}),
    setCurrentBtnClickState : state => setState({currentBtnClickState : state}),
    setPersonalPrjBtnClickState : state => setState({personalPrjBtnClickState : state})
}));

export default headerMenuStore;

