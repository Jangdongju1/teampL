import "./style.css";
import {useState} from "react";
import PersonalProjectListMock from "../../mock/personalProjectList.mock";
export default function  Main(){




    // interface : 개인프로젝트 아이템에 대한 필요한 prop 정의
    interface PersonalPrjProps{
        projectName: string,
        createDate: string
    }

    const PersonalPrjItem = (props: PersonalPrjProps)=>{
        const {createDate,projectName} = props;
        // state: 좋아요 상태
        const [favoriteState, setFavoriteState]= useState<boolean>(false);

        const onFavoriteBtnClickEventHandler = ()=>{
            setFavoriteState(!favoriteState);
        }
        return(
            <div id={"personal-prj-item-wrapper"}>
                <div className={"personal-prj-item-picture-box"}>
                    <div className={"personal-prj-item-picture project-item-picture"}/>
                </div>
                <div className={"personal-prj-item-title-box"}>
                    <div className={"personal-prj-item-title"}>{projectName}</div>
                    <div className={`icon personal-prj-item-favorite-icon ${favoriteState? `favorite-on`: `favorite-off`}`}
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
                            <div className={"main-left-content-personal-title"}>{"개인 프로젝트(진행중)"}</div>
                            <div className={"main-left-content-personal-content"}>
                                {PersonalProjectListMock.map((item ,index)=>
                                    <PersonalPrjItem key={index} projectName={item.projectName} createDate={item.createDate}/>)}
                            </div>
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