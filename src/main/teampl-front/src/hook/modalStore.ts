import {create} from "zustand/react";

interface Modal {
    modalType : string,
    isModalOpen : boolean,
    //buttonType: string,
    setIsModalOpen: (modalState:boolean) => void,
    setModalType:(type:string) => void,
    //setButtonType: (btnTypes:string) => void
}

// 필요한 모달의 숫자는 3 ~ 4개 정도가 있음.
const modalStore = create<Modal>(setState => ({
    modalType : "",
    isModalOpen: false,
    //buttonType : "",
    setModalType: type => setState({modalType : type}),
    setIsModalOpen : state => setState({isModalOpen : state}),
    //setButtonType: btnTypes => setState({buttonType : btnTypes})

}));

export default modalStore;
