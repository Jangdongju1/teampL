import {create} from "zustand/react";
// 간단한 전역 상태관리
interface UserEmail {
    loginUserEmail: string,
    setLoginUserEmail: (newEmail:string) => void;
}

const userEmailStore = create<UserEmail>(setState => ({
    loginUserEmail : "",
    setLoginUserEmail : (newEmail) => setState({loginUserEmail : newEmail})
}));

export default userEmailStore;