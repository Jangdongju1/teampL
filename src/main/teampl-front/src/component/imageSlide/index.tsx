import "./style.css";

//component: 이미지 슬라이드

export default function ImageSlide() {
    const imageUrls: string[] = [
        "https://wac-cdn.atlassian.com/misc-assets/webp-images/confluence-create-a-page.webp",
        "https://wac-cdn.atlassian.com/misc-assets/webp-images/confluence-share-it-with-your-team.webp",
        "https://wac-cdn.atlassian.com/misc-assets/webp-images/confluence-organize-your-work.webp",
        "https://wac-cdn.atlassian.com/misc-assets/webp-images/confluence-organize-your-work.webp"];
    return (
        <div id={"image-slide-wrapper"}>
            <div className={"image-slide-view-port-container"}>
                <div className={"image-slide-view-port"}>
                    <div className={"image-slide-hidden-view"} style={{width:`${imageUrls.length*100}%`}}>

                    </div>
                </div>

            </div>

            <div className={"image-slide-detail-container"}>
                <div className={"image-slide-detail"}>
                    <div className={"image-slide-detail-title"}>{"Connect all your work"}</div>
                    <div
                        className={"image-slide-detail-content"}>{"Stay organized in dedicated workspaces, equipped with AI-powered search."}</div>
                </div>
            </div>

            <div className={"image-slide-button-container"}>
                <div className={"image-slide-button"}>{"슬라이드 버튼 컴포넌트"}</div>
            </div>
        </div>
    )
}