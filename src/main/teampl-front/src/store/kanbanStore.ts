import {create} from "zustand/react";
import {Issue} from "../interface/types";
import {KanbanBoardName} from "../common";

interface KanbanData {
    isTeamKanban: boolean,
    setIsTeamKanban: (newValue: boolean) => void;
    kanbanData: Record<string, Issue[]>,
    setKanbanData: (newValue: Record<string, Issue[]>) => void;
}

const kanbanStore = create<KanbanData>(setState => ({
    isTeamKanban: false,
    setIsTeamKanban: newValue => setState(state => ({isTeamKanban: newValue})),
    kanbanData: {
        [KanbanBoardName.NOT_START]: [],
        [KanbanBoardName.ON_WORKING]: [],
        [KanbanBoardName.STUCK]: [],
        [KanbanBoardName.DONE]: []
    },

    setKanbanData: newValue => setState(state => ({
        ...state,
        kanbanData: newValue
    }))

}))

export default kanbanStore;
