import "./style.css";
import {modalStore} from "../../../store";
import {ModalType} from "../../../common";
import React, {ChangeEvent, useEffect, useState} from "react";
import InitialsImg from "../../InitialsImg";
import {SearchUser} from "../../../interface/types";
import searchUserMock from "../../../mock/searchMember.mock";


export default function InvitationModal() {
    // globalState  : 모달 상태
    const {setModalType, setIsModalOpen} = modalStore();

    // state: 검색바 드롭다운  상태;
    const [dropDownData, setDropDownData] =
        useState<{ isOpen: boolean, data: SearchUser[] }>({isOpen: false, data: []});

    // state: 선택된 인원에 대한 상태 관리
    const [selected, setSelected] = useState<SearchUser[]>([]);


    // state :검색바 상태
    const [searchWord, setSearchWord] = useState<string>("");

    // state : 선택된 인원

    // eventHandler : 닫기버튼 클릭 이벤트 헨드러
    const onModalCloseBtnClickEventHandler = () => {
        setModalType(ModalType.NONE);
        setIsModalOpen(false);
    }

    // eventHandler : 검색어 상태 변경이벤트 처리
    const onSearchBarChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchWord(value);
    }

    // 선택된유저의 삭제버튼 클릭 이벤트 헨들러
    const onDeleteBtnClickEventHandler = (element: SearchUser) => {
        setSelected(prevState => {
            return prevState.filter(user => user.email !== element.email);
        })
    }


    // type:드롭다운에 전달할 props
    type SearchDropDownProps = {
        dropDownData: { isOpen: boolean, data: SearchUser[] },
        setDropDownData: React.Dispatch<React.SetStateAction<{ isOpen: boolean, data: SearchUser[] }>>
        setSelected: React.Dispatch<React.SetStateAction<SearchUser[]>>
    }
    // component : 입력시 나오는 드롭 다운
    const SearchDropDown = ({setSelected, setDropDownData, dropDownData}: SearchDropDownProps) => {

        // eventHandler: 검색된 유저 클릭 이벤트 헨들러
        const onSearchUserListClickEventHandler = (element: SearchUser) => {
            setSelected(prevState => {
                const newArr = [...prevState];
                newArr.push(element);

                return newArr;
            })

            setDropDownData(prevState => {
                return {isOpen: false, data: [...prevState.data]};
            })
        }


        return (
            <div id={"search-drop-down-wrapper"}>
                <div className={"search-drop-down-item-box"}>
                    <div className={"search-bar-drop-down-title"}>{"사람"}</div>

                    {searchUserMock.length !== 0 ?
                        searchUserMock.map((item, index) =>
                            <div className={"search-drop-down-info-box"}
                                 onClick={() => onSearchUserListClickEventHandler(item)}>
                                <div className={"search-drop-down-profile-image"}>
                                    <InitialsImg name={item.email} width={26} height={26}/>

                                </div>
                                <div className={"search-drop-down-email"}>{item.email}</div>
                            </div>) :
                        <div className={"search-drop-down-data-null"}>{"검색결과가 없습니다."}</div>
                    }


                </div>
            </div>
        )
    }

    return (
        <div className={"invitation-modal-wrapper"}>
            <div onClick={onModalCloseBtnClickEventHandler}
                 className={"icon invitation-modal-close-btn close-icon"}></div>

            <div className={"invitation-modal-title-box"}>
                <div className={"invitation-modal-title"}>{"팀 구성원 초대"}</div>
            </div>

            <div className={"invitation-modal-search-bar-box"}>
                <div id={"invitation-search-bar-wrapper"}>
                    <input className={"invitation-search-bar-input"}
                           type={"text"}
                           placeholder={"이메일로 검색하기"}
                           value={searchWord}
                           onChange={onSearchBarChangeEventHandler}
                    />

                    {dropDownData.isOpen && (<SearchDropDown dropDownData={dropDownData}
                                                             setDropDownData={setDropDownData}
                                                             setSelected={setSelected}/>)}

                </div>
            </div>

            <div className={"invitation-selected-user-box"}>
                <div className={"invitation-selected-user-title"}>{"인원(선택됨)"}</div>
                <div className={"invitation-selected-user-item-box"}>

                    {selected.length !== 0 ?
                        selected.map((item, index) =>
                            <div className={"invitation-selected-user-info-box"}>
                                <div className={"invitation-selected-user-profile-image"}>
                                    <InitialsImg name={item.email} width={20} height={20}/>

                                </div>
                                <div className={"invitation-selected-user-email"}>{item.email}</div>

                                <div className={"invitation-selected-user-delete-icon-box"}
                                     onClick={() => onDeleteBtnClickEventHandler(item)}>
                                    <div className={" icon invitation-selected-user-delete-icon close-icon"}></div>
                                </div>
                            </div>)
                        :
                        <div className={"invitation-selected-user-data-null"}>{"선택된 인원이 없습니다."}</div>
                    }


                </div>
            </div>
        </div>
    )
}