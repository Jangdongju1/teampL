import "./style.css";
import {useState} from "react";
import PersonalProjectListMock from "../../mock/personalProjectList.mock";
import IssueCard from "../../component/issueCard";
import IssueCardMock from "../../mock/issueCard.mock";
import issueCardMock from "../../mock/issueCard.mock";
export default function Main() {

    // interface : 개인프로젝트 아이템에 대한 필요한 prop 정의
    interface PersonalPrjProps {
        projectName: string,
        createDate: string
    }

    const PersonalPrjItem = (props: PersonalPrjProps) => {
        const {createDate, projectName} = props;
        // state: 좋아요 상태
        const [favoriteState, setFavoriteState] = useState<boolean>(false);

        const onFavoriteBtnClickEventHandler = () => {
            setFavoriteState(!favoriteState);
        }
        return (
            <div id={"personal-prj-item-wrapper"}>
                <div className={"personal-prj-item-picture-box"}>
                    <div className={"personal-prj-item-picture project-item-picture"}/>
                </div>
                <div className={"personal-prj-item-title-box"}>
                    <div className={"personal-prj-item-title"}>{projectName}</div>
                    <div
                        className={`icon personal-prj-item-favorite-icon ${favoriteState ? `favorite-on` : `favorite-off`}`}
                        onClick={onFavoriteBtnClickEventHandler}/>
                </div>

                <div className={"personal-prj-item-create-date-box"}>
                    <div className={"personal-prj-item-create-date"}>{`생성: ${createDate}`}</div>
                </div>
            </div>
        )
    }
    return (
        <div id={"main-wrapper"}>
            <div className={"main-container"}>
                <div className={"main-left-container"}>
                    <div className={"main-left-content-box"}>

                        <div className={"main-left-content-personal-project"}>
                            <div className={"main-left-content-title"}>
                                {"개인 프로젝트(진행중)"}<span className={"icon main-left-more-btn more-list-icon "}/>
                            </div>
                            {PersonalProjectListMock === null ?
                                <div className={"main-left-content-personal-none"}>
                                    <div
                                        className={"main-left-content-personal-none-comment"}>{"최근 진행한 프로젝트가 없습니다."}</div>
                                </div> :
                                <div className={"main-left-content-personal-content"}>
                                    {PersonalProjectListMock.map((item, index) =>
                                        <PersonalPrjItem key={index} projectName={item.projectName}
                                                         createDate={item.createDate}/>)}
                                </div>
                            }
                        </div>

                        <div className={"main-left-content-personal-issue-list"}>
                            <div className={"main-left-content-title"}>
                                {"이슈 리포트(최근)"}<span className={"icon main-left-more-btn more-list-icon "}/>
                            </div>

                            {!issueCardMock ? <div className={"main-left-content-personal-issue-none"}>{"이슈 리포트가 없습니다."}</div> :
                                <div className={"main-left-content-personal-issue-content"}>
                                    {issueCardMock.map((item, index) =>
                                        <IssueCard
                                            email={item.email}
                                            title={item.title}
                                            priority={item.priority}
                                            stat={item.stat}
                                            inCharge={item.inCharge}
                                            subIssueCnt={item.subIssueCnt}
                                            commentCnt={item.commentCnt}/>)}
                                </div>
                            }


                        </div>

                    </div>
                </div>
                <div className={"main-right-container"}>
                    <div className={"main-right-content-box"}></div>
                </div>
            </div>
        </div>
    )
}