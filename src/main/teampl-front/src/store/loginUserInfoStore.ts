import {create} from "zustand/react";

interface UserInfo{
    info : Record<string, string> | null;
    setInfo : (info:Record<string, string>) => void;
}


const loginUserInfoStore = create<UserInfo>(setState => ({
    info : null,
    setInfo : newInfo => setState(state =>({...state, info : newInfo}))

}))

export default loginUserInfoStore;