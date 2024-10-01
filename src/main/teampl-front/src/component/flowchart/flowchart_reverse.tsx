import "./style.css";
import {FlowChartData} from "../../interface";

export default function FlowchartReverse(props : FlowChartData) {
    // props : flowchardData
    const {title, content, backgroundImg} = props;
    return (
        <div className={"flow-chart"}>
            <div className={"flow-chart-content flow-chart-detail-adjust"}>
                <div className={"flow-chart-detail"}>
                    <div className={"flow-chart-detail-title"}>{title? title : ""}</div>
                    <div className={"flow-chart-detail-divider"}></div>
                    <div className={"flow-chart-detail-content"}>{content? content : ""}</div>
                </div>
            </div>
            <div className={"flow-chart-content flow-chart-picture-adjust"}
            style={{backgroundImage : backgroundImg? `url(${backgroundImg})` : `none`}}></div>
        </div>

    )
}
