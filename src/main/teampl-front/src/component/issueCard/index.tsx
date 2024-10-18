import "./style.css";
import InitialsImg from "../InitialsImg";

interface IssueCardProps {
    email: string,
    title: string,
    priority: number,  // 숫자
    stat: number,  // 숫자
    inCharge: string | null,
    subIssueCnt: number,
    commentCnt: number

}

export default function IssueCard(props: IssueCardProps) {
    const {email, title, inCharge} = props;
    const {priority, stat, commentCnt, subIssueCnt} = props;

    // priority에 따른 css색과 문구
    const getPriority = (priority:number) =>{
        const priorities: { [key: string]: { text: string, color: string } } = {  // 상태는 총 4가지임.
            "0": { text: "Long Term", color: "#e8e8e8" },
            "1": { text: "Normal", color: "#4A90E2" },
            "2": { text: "Urgent", color: "#F5A623" },
            "3": { text: "Very Urgent", color: "#D0021B" }
        };

        return priorities[priority.toString()];
    }
    // stat에 따른 아이콘
    const getStatIcon = (stat:number) =>{
        const statIcons : {[key:string] : string} = {
            "0": "waiting-icon",
            "1": "in-progress-icon",
            "2": "complete-icon"
        }
        return statIcons[stat.toString()];
    }


    return (
        <div id={"issue-card-wrapper"}>
            <div className={"issue-card-container"}>
                <div className={"issue-card-title-box"}>
                    <div className={"issue-card-title multiline-ellipsis"}>{title}</div>
                </div>

                <div className={"issue-card-middle-box"}>
                    <div className={"issue-card-priority-btn"}>
                        {priority < 4 &&(<>
                            <div className={"issue-card-priority-color"} style={{backgroundColor : `${getPriority(priority).color}`}}/>
                            <div className={"issue-card-priority-stat"}>{getPriority(priority).text}</div>
                        </>)}
                    </div>
                </div>

                <div className={"issue-card-bottom-box"}>

                    <div className={"issue-card-bottom-top-box"}>
                        <div className={"issue-card-incharge-box"}>
                            {"inCharge"}

                            {!inCharge ? <span className={"icon issue-card-incharge-icon person-check-icon"}></span> :
                                <span className={"issue-card-incharge-icon"}>
                            <InitialsImg name={email} width={20} height={20}/>
                        </span>}

                        </div>
                    </div>

                    <div className={"issue-card-bottom-middle-box"}>
                    <div className={"issue-card-bottom-middle-stat"}>
                            {"status"}
                            <span className={`icon stat-icon ${stat < 3? getStatIcon(stat) :``}`}/>
                        </div>
                    </div>

                    <div className={"issue-card-bottom-bottom-bottom-box"}>
                        <div className={"issue-card-bottom-etc-box"}>

                            <div className={"issue-card-bottom-icon-box"}>
                                <span className={"icon issue-card-icon comment-icon"}></span> {commentCnt}
                            </div>

                            <div className={"issue-card-bottom-icon-box"}>
                                <span className={"icon issue-card-icon connect-icon"}></span> {subIssueCnt}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}