import "./style.css";
import {useEffect, useState} from "react";
import {imageSlide_1DataListMock} from "../../mock";
//component: 이미지 슬라이드

export default function ImageSlide() {

    //  state: 이미지 슬라이드 인덱스 상태
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // function : 오른쪽으로 이동.
    const handleNext = () => {
        currentIndex === imageSlide_1DataListMock.length - 1 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1);
    }
    // function: 왼쪽으로 이동.
    const handlePrev = () => {
        currentIndex === 0 ? setCurrentIndex(imageSlide_1DataListMock.length - 1) : setCurrentIndex(currentIndex - 1);
    }

    interface SlideButtonProp {
        next: () => void,
        prev: () => void,
        slideIndex: number;
    }


    useEffect(() => {
        const interval = setInterval(() =>{
            setCurrentIndex(prevState =>
            prevState === imageSlide_1DataListMock.length-1? 0 : prevState+1);
        }, 4000);

        // 언 마운트시 제거
        return ()=>{
            clearInterval(interval);
        }
    }, []);

    const SlideButton = (prop: SlideButtonProp) => {
        // eventHandler  : 이미지 슬라이드 리스트 버튼 클릭 헨드러
        const onImageSlideBtnClickEventHandler = (index: number) => {
            setCurrentIndex(index);
        }
        const {prev, next, slideIndex} = prop;
        return (
            <div id={"slide-button-wrapper"}>
                <div className={"slide-list-button-container"}>
                    <div className={"icon-button"}>
                        <div className={"icon slide-left-button"} onClick={prev}></div>
                    </div>
                    <div className={"slide-list-button"}>
                        <div className={"slide-list"}>
                            {imageSlide_1DataListMock.map((item, index) => <div
                                key={index}
                                className={`${index === slideIndex ? `slide-list-active` : `slide-list-disable`}`}
                                onClick={() => onImageSlideBtnClickEventHandler(index)}></div>)}
                        </div>
                    </div>
                    <div className={"icon-button"}>
                        <div className={"icon slide-right-button"} onClick={next}></div>
                    </div>
                </div>

                <div className={"slide-stop-button-container"}>
                    <div className={"slide-stop-button"}></div>
                </div>

            </div>
        )
    }


    return (
        <div id={"image-slide-wrapper"}>
            <div className={"image-slide-view-port-container"}>
                <div className={"image-slide-view-port"}>
                    <div className={"image-slide-hidden-view"} style={{
                        width: `${imageSlide_1DataListMock.length * 100}%`,
                        transform: `translateX(-${(currentIndex / imageSlide_1DataListMock.length) * 100}%)`
                    }}>

                        {imageSlide_1DataListMock.map((item, index) =>
                            <div key={index} className={`image-slide-item`}
                                 style={{
                                     width: `${100 / imageSlide_1DataListMock.length}%`,
                                     backgroundImage: `url(${item.imageUrl})`
                                 }}></div>)}
                    </div>
                </div>

            </div>

            <div className={"image-slide-detail-container"}>
                <div className={"image-slide-detail"}>
                    <div className={"image-slide-detail-title"}>{imageSlide_1DataListMock[currentIndex].title}</div>
                    <div
                        className={"image-slide-detail-content"}>{imageSlide_1DataListMock[currentIndex].content}</div>
                </div>
            </div>

            <div className={"image-slide-button-container"}>
                <div className={"image-slide-button"}>
                    <SlideButton next={handleNext} prev={handlePrev} slideIndex={currentIndex}/>
                </div>
            </div>
        </div>
    )
}