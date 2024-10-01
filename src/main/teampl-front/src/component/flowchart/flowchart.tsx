import "./style.css";
import {FlowChartData} from "../../interface";



//component : 로그인화면 플로우 차트
export default function FlowChart(props : FlowChartData) {

    // 플로우 차트 props
    const {title, content, backgroundImg} = props;


    return (
        <div className={"flow-chart"}>
            <div className={"flow-chart-content flow-chart-picture-adjust"}
                 style={ { backgroundImage : backgroundImg? `url(${backgroundImg})` : `none` }}></div>

            <div className={"flow-chart-content flow-chart-detail-adjust"}>
                <div className={"flow-chart-detail"}>
                    <div className={"flow-chart-detail-title"}>{title? title : ""}</div>
                    <div className={"flow-chart-detail-divider"}></div>
                    <div className={"flow-chart-detail-content"}>{content? content : ""}</div>
                </div>
            </div>
        </div>
    )
}