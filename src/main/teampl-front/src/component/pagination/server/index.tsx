import "./style.css"
import React from "react";

type PaginationProps = {
    viewPageList: number[],
    currentSection: number,
    currentPage: number,
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
export default function Pagination(props: PaginationProps) {
    const {
        viewPageList,
        currentPage,
        setCurrentSection,
        currentSection,
        setCurrentPage
    } = props;

    // 페이지 버튼 클릭  이벤트 헨들러
    const onPageBtnClickEventHandler = (pageNum: number)=>{
        setCurrentPage(pageNum);
    }

    return (
        <div id="pagination-wrapper">
            <div className="pagination-change-link-box">
                <div className="icon-box-small">
                    <div className="icon expand-left-light-icon"></div>
                </div>
                <div className="pagination-change-link-text" onClick={() => console.log("이전")}>{"이전"}</div>
            </div>

            <div className="pagination-divider">{"|"}</div>
            {viewPageList.map((page, index) =>
                page === currentPage ? <div key={index} className="pagination-text-active">{page}</div> :
                    <div key={index} className="pagination-text"
                         onClick={() => onPageBtnClickEventHandler(page)}>{page}</div>)}


            <div className="pagination-divider">{"|"}</div>

            <div className="pagination-change-link-box">
                <div className="pagination-change-link-text" onClick={() => console.log("다음")}>{"다음"}</div>
                <div className="icon-box-small">
                    <div className="icon expand-right-light-icon"></div>
                </div>
            </div>
        </div>
    )
}