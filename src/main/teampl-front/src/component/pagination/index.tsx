import "./style.css"

export default function Pagination() {

    return (
        <div id="pagination-wrapper">
            <div className="pagination-change-link-box">
                <div className="icon-box-small">
                    <div className="icon expand-left-light-icon"></div>
                </div>
                <div className="pagination-change-link-text" onClick={() => console.log("이전")}>{"이전"}</div>
            </div>

            <div className="pagination-divider">{"|"}</div>
            {/*{viewPageList.map((page, index) =>*/}
            {/*    page === currentPage ? <div key={index} className="pagination-text-active">{page}</div> :*/}
            {/*        <div key={index} className="pagination-text"*/}
            {/*             onClick={() => onPageClickEventHandler(page)}>{page}</div>)}*/}


            <div className="pagination-divider">{"|"}</div>

            <div className="pagination-change-link-box">
                <div className="pagination-change-link-text" onClick={()=>console.log("다음")}>{"다음"}</div>
                <div className="icon-box-small">
                    <div className="icon expand-right-light-icon"></div>
                </div>
            </div>
        </div>
    )
}