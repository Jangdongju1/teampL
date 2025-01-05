import "./style.css";

//*  모달에 단순 데이터를 표기하는 컴포넌트
type ModalCompNormalProps = {
    labelName : string,
    labelIcon : string,
    viewData: string,
}
export default function ModalCompNormal(props:ModalCompNormalProps){
    const {viewData,labelIcon,labelName}=props;

    return (
        <div className={"issue-modal-normal-comp-wrapper"}>
            <div className={"issue-modal-normal-comp-label-box"}>
                <span className={`icon issue-modal-normal-comp-label-icon ${labelIcon}`}/>
                {labelName}
            </div>

            <div className={"issue-modal-normal-comp-content-box"}>
                <div className={"issue-modal-normal-comp-show-box"}>{viewData}</div>
            </div>
        </div>

    )
}