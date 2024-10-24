import "./style.css";
import ProjectCard from "../../component/projectCard/projectCard";
import personalProjectListMock from "../../mock/personalProjectList.mock";
import {modalStore} from "../../hook";
import CreationModal from "../../component/modal/creationModal/creationModal";

export default function PersonalProject() {

    // 각각 버튼의 종류는 아래와 같이 정의한다.
    //개인프로젝트 : 1) projectList 2) createProject => key값 == pl, cp
    //팀프로젝트 : 1) 팀원초대, 2)팀프로젝트 목록 key값 => ti, tl

    //state: 모달에 대한 전역상태
    const {modalType,isModalOpen,setModalType, setIsModalOpen} = modalStore();

    //event Handler: 프로젝트 생성 버튼 클릭 이벤트 헨들러
    const onCreateProjectBtnClickEventHandler = ()=>{

    }

    type PersonalDashBoardProp = {
        // 1) 개인프로젝트수 2) 완료된프로젝트수 3) 처리된 이슈의 숫자 4) 미처리 이슈의 숫자
    }
    // 상단 대시보드 컴포넌트
    const PersonalPrjDashBoardTable = () => {
        return (
            <div id={"personal-dashboard-table-wrapper"}>
                {isModalOpen && modalType === "cp" &&(
                    <CreationModal title={"Create a Project"}
                                   comment={"개인용 프로젝트를 생성합니다."}
                                   nameLabel={"Project Name"}
                                   nameToolTip={"이 프로젝트를 누가 보나요?"}
                                   onClick={onCreateProjectBtnClickEventHandler}
                                   isTeamCreationModal={false}/>
                )}
                <table className={"personal-dashboard-table"}>
                    <thead className={"personal-dashboard-table-head"}>
                    <tr>
                        <td>진행중</td>
                        <td>완료</td>
                        <td>이슈(미처리)</td>
                        <td>이슈(처리완료)</td>
                    </tr>
                    </thead>

                    <tbody className={"personal-dashboard-table-body"}>
                    <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div id={"personal-project-wrapper"}>
            <div className={"personal-project-top-container"}>
                <div className={"personal-project-top-title"}>{"DashBoard"}</div>
                <div className={"divider"}></div>
                <PersonalPrjDashBoardTable/>
            </div>
            <div className={"personal-project-bottom-container"}>
                <div className={"personal-project-bottom-title-box"}>
                    <div className={"personal-project-bottom-title"}>{"Project"}</div>
                </div>
                <div className={"divider"}></div>

                <div className={"personal-project-bottom-content-box"}>
                    <div className={"personal-project-bottom-content"}>
                        {!personalProjectListMock ?
                            <div className={"personal-project-none"}>{"진행중인 프로젝트가 없습니다."}</div> :
                            personalProjectListMock.map((item, index) => <ProjectCard
                                key={index}
                                projectName={item.projectName}
                                createDate={item.createDate}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}