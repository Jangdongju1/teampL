import "./style.css";
import {useState} from "react";


type ProjectCardProps = {
    projectName: string,
    createDate: string,

}

export default function ProjectCard(props : ProjectCardProps) {
    const {projectName,createDate} = props;
    // state: 즐겨찾기 버튼 클릭 상태
    const [startBtnClickState, setStarBtnClickState] = useState<boolean>(false);

    // eventHandler: 즐겨찾기 버튼 클릭 이벤트 헨들러
    const onStartBtnClickEventHandler = () => {
        setStarBtnClickState(!startBtnClickState);
    }


    return (
        <div className={"project-card-wrapper"}>
            <div className={"project-card-container"}>
                <div className={"project-card-top-container"}>
                    <div className={"project-card-top-picture project-item-picture"}></div>
                </div>

                <div className={"project-card-bottom-container"}>
                    <div className={"project-card-name-box"}>
                        <div className={"project-card-name-frame"}>
                            <span className={"icon project-name-icon personal-project-icon"}></span>
                            <div className={"project-card-name"}>{projectName}</div>
                        </div>
                        <div
                            className={`icon project-card-favorite-icon ${startBtnClickState ? "favorite-on" : "favorite-off"}`}
                            onClick={onStartBtnClickEventHandler}>
                        </div>
                    </div>

                    <div className={"project-card-create-date-box"}>
                        <div className={"project-card-create-date"}>
                            {createDate}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}