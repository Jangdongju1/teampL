import "./style.css";
import {Outlet} from "react-router-dom";
import MainHeader from "../../header/mainHeader";
import InitialsImg from "../../../component/InitialsImg";

export default function MainContainer() {



    interface ParticipantsProp{
        email: string,
        nickname: string,
        profileImg? : string,
        teamRole: number
    }


    // 참여자 컴포넌트
    const ParticipantsCardItem = (props : ParticipantsProp)=>{
        const {email,nickname,profileImg} = props;
        const {teamRole} = props;

        // function : 값에 따른 직급 얻어오기
        const getRole = (teamRole: number) =>{
            const roles : {[roleNum : string] : string} ={
                "0" : "팀장",
                "1" : "팀원"
            }
            return roles[teamRole.toString()];
        }
        return (
            <div className={"participants-card-wrapper"}>
                {!profileImg ? <InitialsImg name={email} width={30} height={30}/> :
                    <div className={"participants-card-picture"}/>
                }

                <div className={"participants-card-info"}>
                    <div className={"participants-card-info-nickname"}>{nickname}</div>
                    <div className={"participants-card-info-email"}>{email}</div>
                </div>

                <div className={"participants-card-info-role"}>{getRole(teamRole)}</div>
            </div>
        )
    }
    return (
        <>
            <MainHeader/>
            <div id={"main-wrapper"}>
                <div className={"main-container"}>
                <div className={"main-left-container"}>
                        <Outlet/>
                    </div>
                    <div className={"main-right-container"}>
                        <div className={"main-right-participants-container"}>
                            <div className={"main-right-participants-title"}>{"팀 참여자"}</div>
                            <div className={"main-right-participants-divider"}></div>
                            <div className={"main-right-participants-body"}>
                                <ParticipantsCardItem email={"jdj881204@naver.cowewefewwem"} nickname={"동주"} teamRole={1}/>
                            </div>
                        </div>
                        <div className={"main-right-etc-container"}>{"기타"}</div>
                    </div>
                </div>
            </div>
        </>
    )
}