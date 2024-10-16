import "./style.css";
import {useRef, useState} from "react";
import defaultProfileImg from "../../../asset/defaultProfileImg.png";
import InitialsImg from "../../../component/InitialsImg";

export default function MainHeader() {
    // state : 팀버튼 클릭 상태
    const [teamBtnClickState, setTeamBtnClickState] = useState<boolean>(false);
    // state : 최근 버튼 클릭 상태.
    const [currentBtnClickState, setCurrentBtnClickState] = useState<boolean>(false);
    // eventHandler : 팀 버튼 클릭 이벤트 헨들러
    const onTeamBtnClickEventHandler = () => {
        setTeamBtnClickState(!teamBtnClickState);
        setCurrentBtnClickState(false);
    }
    const onCurrentBtnClickEventHandler = () =>{
        setCurrentBtnClickState(!currentBtnClickState);
        setTeamBtnClickState(false);
    }

    const TeamDetailComp = () =>{
        return (
            <div className={"team-detail-wrapper"}>
                <ul className={"team-detail-menu"}>
                    <li><span className={"icon group-add-icon"}></span>{"팀 생성"}</li>
                    <li><span className={"icon add-icon"}></span>{"TeamPL에 사용자 초대"}</li>
                    <li><span className={"icon search-icon"}></span>{"사용자 및 팀 검색"}</li>
                </ul>
            </div>
        )
    }

    const CurrentDetailComp = ()=>{
        return (
            <div className={"current-detail-wrapper"}>
                <div className={"current-detail-title"}>{"최근의 작업"}</div>
                <div className={"divider"}></div>
                <div className={"current-detail-content-box"}>
                    <div className={"current-detail-none-box"}>
                        <div className={"current-detail-none-img"}></div>
                        <div className={"current-detail-none-comment"}>{"최근 진행한 내역이 없습니다."}</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div id={"main-header-wrapper"}>
            <div className={"main-header-container"}>
                <div className={"main-header-content-box"}>
                    <div className={"main-header-content1"}>
                        <div className={"main-header-logo-content-box"}>
                            <div className={"main-header-logo tool-logo"}></div>
                            <div className={"main-header-tool-name"}>{"TeamPL"}</div>
                        </div>
                        <div className={"main-header-menu-box"}>
                            <ul className={"main-header-menu"}>
                                <li>홈</li>
                                <li onClick={onCurrentBtnClickEventHandler}> 최근<span className={"icon arrow-down-icon"}></span></li>
                                <li onClick={onTeamBtnClickEventHandler}> 팀<span
                                    className={"icon arrow-down-icon"}></span></li>
                                <li>이슈 리포트</li>
                                <li>캘린더</li>
                            </ul>
                        </div>
                        {teamBtnClickState && (<div className={"main-header-menu-detail1"}>
                            <TeamDetailComp/>
                        </div>)}
                        {currentBtnClickState && (<div className={"main-header-menu-detail2"}>
                            <CurrentDetailComp/>
                        </div>)}
                    </div>
                    <div className={"main-header-content2"}>
                        <div className={"main-header-individual-content-box"}>
                            <InitialsImg name={"jdj881204@naver.com"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}