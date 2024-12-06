import "./style.css";
import ProjectCard from "../../component/projectCard/projectCard";
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {getPersonalPrjListRequest} from "../../api/projectApi";
import {GetPersonalPrjListResponse, ResponseDto} from "../../interface/response";
import ResponseCode from "../../common/enum/responseCode";
import {personalPrjStore, userEmailStore} from "../../store";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {HOME_PATH, PERSONAL_PROJECT_BOARD_PATH} from "../../constant/path";

export default function PersonalProject() {
    //* navigate : 네비게이트 함수
    const navigator = useNavigate();
    // global state : 개인프로젝트의 상태
    const {projects, setProjects} = personalPrjStore();
    // global state : 유저의 이메일 상태
    const {loginUserEmail} = userEmailStore();
    // state : 쿠키 상태
    const [cookies, setCookies] = useCookies();

    //* 프로젝트 엘리먼트 클릭 이벤트 처리함수
    const onPrjElementClickEventHandler = (identifier: string | null, projectNum: string) => {
        const accessToken = cookies.accessToken_Main;
        if (!accessToken) return;

        identifier = btoa(loginUserEmail);


        navigator(`${HOME_PATH()}/${PERSONAL_PROJECT_BOARD_PATH(identifier, projectNum)}`);

    }

    //* function: 프로젝트 리스트를 가져오는 요청에 대한 응답처리 함수.
    const getPersonalPrjResponse = (responseBody: GetPersonalPrjListResponse | ResponseDto | null) => {
        if (!responseBody) return;
        const {code, message} = responseBody as ResponseDto;

        if (code != ResponseCode.SUCCESS) alert(message);

        const {data} = responseBody as GetPersonalPrjListResponse;
        setProjects(data.list);
    }

    //* function:진행중인 프로젝트 갯수를 계산하는 함수.
    const getPrjOnWorkingCnt = () => {
        return projects.filter(value => value.stat === 0).length;
    }


    // 각각 버튼의 종류는 아래와 같이 정의한다.
    //개인프로젝트 : 1) projectList 2) createProject => key값 == pl, cp
    //팀프로젝트 : 1) 팀원초대, 2)팀프로젝트 목록 key값 => ti, tl

    type PersonalDashBoardProp = {
        // 1) 개인프로젝트수 2) 완료된프로젝트수 3) 처리된 이슈의 숫자 4) 미처리 이슈의 숫자
        prjOnWorkingCnt: number,
        prjCompleteCnt: number
    }
    // 상단 대시보드 컴포넌트
    const PersonalPrjDashBoardTable = (props: PersonalDashBoardProp) => {
        const {prjOnWorkingCnt, prjCompleteCnt} = props;
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
                        <td>{prjOnWorkingCnt}</td>
                        <td>{prjCompleteCnt}</td>
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

            const responseBody = await getPersonalPrjListRequest(token);
            getPersonalPrjResponse(responseBody);
        };

        fetchData();

    }, []);

    return (
        <div id={"personal-project-wrapper"}>
            <div className={"personal-project-top-container"}>
                <div className={"personal-project-top-title"}>{"DashBoard"}</div>
                <div className={"divider"}></div>
                <PersonalPrjDashBoardTable
                    prjCompleteCnt={projects.length - getPrjOnWorkingCnt()}
                    prjOnWorkingCnt={getPrjOnWorkingCnt()}/>
            </div>
            <div className={"personal-project-bottom-container"}>
                <div className={"personal-project-bottom-title-box"}>
                    <div className={"personal-project-bottom-title"}>{"Project"}</div>
                </div>
                <div className={"divider"}></div>

                <div className={"personal-project-bottom-content-box"}>
                    <div className={"personal-project-bottom-content"}>
                        {/*<div className={"personal-project-none"}>{"진행중인 프로젝트가 없습니다."}</div>*/}
                        {!projects ?
                            <div className={"personal-project-none"}>{"진행중인 프로젝트가 없습니다."}</div> :
                            projects.map((item, index) =>
                                <ProjectCard
                                    key={item.projectNum}
                                    projectNum={item.projectNum.toString()}
                                    projectName={item.projectName}
                                    createDate={item.createDate}
                                    onClick={() => onPrjElementClickEventHandler(loginUserEmail, item.projectNum.toString())}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}