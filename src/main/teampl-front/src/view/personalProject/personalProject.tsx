import "./style.css";
import ProjectCard from "../../component/projectCard/projectCard";
import {useEffect, useState} from "react";
import {Project} from "../../interface/types";
import {useCookies} from "react-cookie";
import {getPersonalPrjRequest} from "../../api/projectApi";
import {GetPersonalPrjResponse, ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/responseCode";

export default function PersonalProject() {
    // state: 개인프로젝트 상태
    const [personalPrjState, setPersonalPrjState] = useState<Project[]>([]);
    // state : 쿠키 상태
    const [cookies, setCookies] = useCookies();


    //* function: 프로젝트 리스트를 가져오는 요청에 대한 응답처리 함수.
    const getPersonalPrjResponse = (responseBody: GetPersonalPrjResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code != ResponseCode.SUCCESS) alert(message);

        const {data} = responseBody as GetPersonalPrjResponse;
        setPersonalPrjState(data.list);
    }


    // 각각 버튼의 종류는 아래와 같이 정의한다.
    //개인프로젝트 : 1) projectList 2) createProject => key값 == pl, cp
    //팀프로젝트 : 1) 팀원초대, 2)팀프로젝트 목록 key값 => ti, tl

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

    useEffect(() => {
        const fetchData = async () => {
            const token = cookies.accessToken_Main;
            if (!token) return;

            const responseBody = await getPersonalPrjRequest(token);
            getPersonalPrjResponse(responseBody);
        };

        fetchData();

    }, []);

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
                        {/*<div className={"personal-project-none"}>{"진행중인 프로젝트가 없습니다."}</div>*/}
                        {!personalPrjState ?
                            <div className={"personal-project-none"}>{"진행중인 프로젝트가 없습니다."}</div> :
                            personalPrjState.map((item, index)=>
                                <ProjectCard projectName={item.projectName} createDate={item.createDate}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}