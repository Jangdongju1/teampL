import "./style.css";
import ProjectCard from "../../component/projectCard/projectCard";
import PersonalProjectListMock from "../../mock/personalProjectList.mock";
import personalProjectListMock from "../../mock/personalProjectList.mock";
import {useCookies} from "react-cookie";

export default function PersonalProject() {


    type PersonalDashBoardProp = {
        // 1) 개인프로젝트수 2) 완료된프로젝트수 3) 처리된 이슈의 숫자 4) 미처리 이슈의 숫자
    }
    // 상단 대시보드 컴포넌트
    const PersonalPrjDashBoardTable = () => {


        return (
            <div id={"personal-dashboard-table-wrapper"}>
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
                                projectName={item.projectName}
                                createDate={item.createDate}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}