import "./style.css";
import FlowChartDataListMock from "../../mock/flowChartDataList.mock";
import FlowChart from "../../component/flowchart/flowchart";
import FlowchartReverse from "../../component/flowchart/flowchart_reverse";

// component : 로그인 관련 컴포넌트
export default function Authentication() {

    const SignInCard = () => {

        return (
            <div id={"auth-card"}>
                {"로그인 카드"}
            </div>
        )
    }

    return (
        <div id={"auth-wrapper"}>
            <div className={"auth-top-fixed-bar-container"}>
                <div className={"auth-top-fixed-bar"}>
                    <div className={"auth-top-logo-container"}>
                        <div className={"auth-top-logo"}>{"로고"}</div>
                        <div className={"auth-top-tool-name"}>{"회사이름"}</div>
                    </div>
                </div>
            </div>

            <div className={"auth-top-container"}>
                <div className={'auth-top-contents-container'}>
                    <div className={"auth-top-signIn-card auth-top-content-flex"}>{"로그인 컴포넌트"}</div>
                    <div className={"auth-top-slide auth-top-content-flex"}>{"슬라이드 컴포넌트"}</div>
                </div>
            </div>

            <div className={"auth-middle-container"}>
                <div className={"auth-middle-advertising-comment-container"}>
                    <div className={"auth-middle-advertising-comment"}>{"teamPL을 사용하여 공동 작업을 진행해 보세요."}</div>
                </div>
            </div>

            <div className={"auth-bottom-container"}>
                <div className={"auth-bottom-content-container"}>
                    {FlowChartDataListMock.map((item, index) =>
                    index%2 ==0? <FlowChart title={item.title} content={item.content} backgroundImg={item.backgroundImg}/> :
                    <FlowchartReverse title={item.title} content={item.content} backgroundImg={item.backgroundImg}/>
                    )}

                </div>
            </div>
        </div>
    )
}