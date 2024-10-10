import {create} from "zustand/react";
// 간단한 전역 상태관리
interface UserEmail {
    email: string,
    setEmail: (newEmail:string) => void;
}

const userEmailStore = create<UserEmail>(setState => ({
    email : "",
    setEmail : (newEmail) => setState({email : newEmail})
}));

export default userEmailStore;