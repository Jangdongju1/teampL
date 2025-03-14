import "./style.css";
import {modalStore} from "../../../store";
import {ModalType} from "../../../common";
import React, {ChangeEvent, useCallback, useState} from "react";
import InitialsImg from "../../InitialsImg";
import {SearchUser} from "../../../interface/types";
import CommonBtn from "../../btn";
import {debounce} from "lodash";
import {useCookies} from "react-cookie";
import {getSearchUserRequest} from "../../../api/userApi";
import {GetSearchUserResponse, ResponseDto} from "../../../interface/response";
import ResponseCode from "../../../common/enum/responseCode";
import teamParamStore from "../../../store/teamParamStore";
import {useParams} from "react-router-dom";
import {InvitationMemberRequest} from "../../../interface/request";
import {invitationTeamMemberRequest} from "../../../api/teamApi";
import InvitationMemberResponse from "../../../interface/response/team/invitationMemberResponse";
import ConfirmModal from "../confirm/confirmModal";


export default function InvitationModal() {
    // pathVariable
    const {regNum} = useParams();
    // globalState  : 모달 상태
    const {setModalType, setIsModalOpen} = modalStore();
    // sessionStorage : 로그인한 유저
    const loginUserEmail = sessionStorage.getItem("identifier");
    //const {loginUserEmail} = userEmailStore();

    // globalState : 팀 등록번호 관련 전역상태;
    const {teamNumber, setTeamNumber} = teamParamStore();
    // state: 검색바 드롭다운  상태;
    const [dropDownData, setDropDownData] =
        useState<{ isOpen: boolean, data: SearchUser[] }>({isOpen: false, data: []});

    // state: 선택된 인원에 대한 상태 관리
    const [selected, setSelected] = useState<SearchUser[]>([]);

    // state :검색바 상태
    const [searchWord, setSearchWord] = useState<string>("");

    // state : 팀원 초대 관련 확인용 모달 오픈상태
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

    // 쿠키 및 accessToken 상태
    const [cookies, setCookies] = useCookies();
    const accessToken = cookies.accessToken_Main;

    // email 관련 정규식
    const regex = new RegExp("^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");


    // function: 모달 닫기
    const closeModal = ()=>{
        setModalType("");
        setIsModalOpen(false);
    }

    // function: 팀 멤버 초대요청에 대한 응답처리함수
    const inviteTeamMemberResponse = (responseBody: InvitationMemberResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }
        alert("초대 요청을 보냈습니다.");
        closeModal();
    }
    // function : 유저 검색에 대한 응답처리 함수.
    const getSearchUserResponse = (responseBody: GetSearchUserResponse | ResponseDto | null) => {
        if (!responseBody) return;

        const {code, message} = responseBody as ResponseDto;

        if (code !== ResponseCode.SUCCESS) {
            alert(message);
            return;
        }

        const {data} = responseBody as GetSearchUserResponse;

        const updateStates = {isOpen: true, data: data.list}

        setDropDownData(updateStates);
    }

    // function: 검색함수
    const handleSearch = useCallback((word: string) => {
        const isMatch = regex.test(word);
        // 이메일에 관련된 정규 표현식에 맞지 않을때 무시함.
        if (!isMatch || !accessToken) return;

        // api호출 및 상태 세팅
        const fetchUserData = async () => {
            const responseBody = await getSearchUserRequest(word, accessToken);
            getSearchUserResponse(responseBody);
        }

        fetchUserData();
    }, [])


    // 1000ms(1sec)이 지나고나서 실행되도록 debounce를 적용함.
    const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

    // eventHandler : 닫기버튼 클릭 이벤트 헨들러
    const onModalCloseBtnClickEventHandler = () => {
        setDropDownData(prevState => ({
            ...prevState,
            isOpen: false,
            data: []
        }));

        setModalType(ModalType.NONE);
        setIsModalOpen(false);
    }

    // eventHandler : 검색어 상태 변경이벤트 처리
    const onSearchBarChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchWord(value);

        if (regex.test(value)) {
            if(!loginUserEmail) return;
            if (value === atob(loginUserEmail)) return;
            debounceSearch(value);
        } else {
            debounceSearch.cancel();
            setDropDownData(prevState => ({
                ...prevState,
                isOpen: false,
                data: []
            }));
        }
    }

    // eventHandler: 선택된유저의 삭제버튼 클릭 이벤트 헨들러
    const onDeleteBtnClickEventHandler = (element: SearchUser) => {
        setSelected(prevState => {
            return prevState.filter(user => user.email !== element.email);
        })
    }

    // eventHandler  : 팀원 초대 버튼 클릭 이벤트 헨들러
    const onInvitationConfirmBtnClickEventHandler = () => {
        if (!accessToken || selected.length === 0 || !teamNumber) return;
        const members: string[] = [];

        for (const item of selected) {
            members.push(item.email);
        }

        // 요청 바디
        const requestBody: InvitationMemberRequest = {regNum: teamNumber, members};

        const inviteTeamMember = async () => {
            const responseBody = await invitationTeamMemberRequest(requestBody, accessToken);
            inviteTeamMemberResponse(responseBody);
        }
        inviteTeamMember();
    }
    // eventHandler : 확인창  취소버튼 클릭 이벤트 헨들러
    const onCancelBtnClickEventHandler = ()=>{
        setIsConfirmOpen(false);
    }

    // eventHandler : 팀원초대버튼 클릭 이벤트 헨들러
    const onMemberInvitationBtnClickEventHandler = () => {
        setIsConfirmOpen(true);
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

                    {dropDownData.data.length !== 0 ?
                        dropDownData.data.map((item, index) =>
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
            {isConfirmOpen && (
                <div className={"invitation-modal-blur"}></div>
            )}
            <div onClick={onModalCloseBtnClickEventHandler}
                 className={"icon invitation-modal-close-btn close-icon"}></div>

            <div className={"invitation-modal-title-box"}>
                <div className={"invitation-modal-title"}>{"팀 구성원 초대"}</div>
            </div>

            <div className={"invitation-modal-search-bar-box"}>
                <div id={"invitation-search-bar-wrapper"}>
                    <input className={"invitation-search-bar-input"}
                           type={"text"}
                           placeholder={"이메일로 검색 ex) example@example.com"}
                           value={searchWord}
                           onChange={onSearchBarChangeEventHandler}
                    />

                    {dropDownData.isOpen && (<SearchDropDown dropDownData={dropDownData}
                                                             setDropDownData={setDropDownData}
                                                             setSelected={setSelected}/>)}

                </div>
            </div>

            {selected.length > 0 && (
                <div className={"invitation-selected-user-box"}>


                    <div className={"invitation-selected-user-title"}>{"인원(선택됨)"}</div>
                    <div className={"invitation-selected-user-item-box"}>

                        {selected.length !== 0 ?
                            selected.map((item, index) =>
                                <div key={index} className={"invitation-selected-user-info-box"}>
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
            )}

            <div className={"invitation-selected-user-btn-box"}>
                <CommonBtn
                    style={
                        {
                            size: {width: 300, height: 32},
                            btnName: "팀원 초대하기",
                            backgroundColor: "#0C66E4",
                            hoverColor: "#0052CC",
                            hoverStyle: "background",
                            fontSize: 16,
                            fontColor: "rgba(255,255,255,1)"
                        }
                    }
                    onClick={onMemberInvitationBtnClickEventHandler}/>
            </div>

            {isConfirmOpen && (<ConfirmModal
                cssOption={
                    {
                        size: {width: 350, height: 150},
                        icon: "invitation-icon",
                    }}
                comment={"선택하신 팀원을 초대합니다."}
                detail={"선택하신 팀원을 초대하시겠습니까?"}
                confirm={onInvitationConfirmBtnClickEventHandler}
                cancel={onCancelBtnClickEventHandler}
            />)}


        </div>
    )
}