import "./style.css"

export default function Home() {


    // comp : 상단 대시보드 1) 진행중인 or 완료한 개인프로젝트 숫자 및 팀프로젝트 숫자
    const HomeTopDashBoardItem = () => {

        return (
            <div className={"home-top-dashboard-wrapper"}>
                <table className={"home-top-dashboard-table"}>
                    <thead className={"home-top-table-head"}>
                    <tr>
                        <td>{"개인프로젝트(진행 중)"}</td>
                        <td>{"개인프로젝트(완료)"}</td>
                        <td>{"팀프로젝트(진행 중)"}</td>
                        <td>{"팀프로젝트(완료)"}</td>
                    </tr>
                    </thead>

                    <tbody className={"home-top-table-body"}>
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
        <div id={"home-wrapper"}>
            <div className={"home-top-container"}>
                <div className={"home-top-content-title"}>{"Dash Board"}</div>
                <div className={"divider"}/>
                <div className={"home-top-content-body"}><HomeTopDashBoardItem/></div>
            </div>

            <div className={"home-bottom-container"}>{"바텀 컨텐츠 무엇을 넣을지 생각해보기"}</div>
        </div>
    )
}