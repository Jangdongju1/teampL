import {create} from "zustand/react";

interface Modal {
    modalType : string,
    isModalOpen : boolean,

    setIsModalOpen: (modalState:boolean) => void,
    setModalType:(type:string) => void,
}

// 필요한 모달의 숫자는 3 ~ 4개 정도가 있음.
const modalStore = create<Modal>(setState => ({
    modalType : "",
    isModalOpen: false,
    setModalType: type => setState({modalType : type}),
    setIsModalOpen : state => setState({isModalOpen : state}),


}));

export default modalStore;
