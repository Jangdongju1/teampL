import {modalStore} from "../store";

export const useModal = ()=>{
    const {modalType,isModalOpen, setIsModalOpen,setModalType} = modalStore();

    const openModal = (type :string)=>{
        setModalType(type);
        setIsModalOpen(true);
    }

    const closeModal = ()=>{
        setModalType("");
        setIsModalOpen(false);
    }


    return {
        modalType,
        isModalOpen,
        openModal,
        closeModal
    }

}