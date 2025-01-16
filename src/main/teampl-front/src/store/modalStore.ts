import {create} from "zustand/react";
// 타입별 모달의 오픈 및 클로즈를 담당하는 전역 상태

interface Modal {
    modalType : string,
    isModalOpen : boolean,
    setIsModalOpen: (modalState:boolean) => void,
    setModalType:(type:string) => void,
}

// 각각의 모달들의 오픈상태 등등을 관리한는 전역상태
const modalStore = create<Modal>(setState => ({
    modalType : "",
    isModalOpen: false,
    setModalType: type => setState({modalType : type}),
    setIsModalOpen : state => setState({isModalOpen : state}),


}));

export default modalStore;
