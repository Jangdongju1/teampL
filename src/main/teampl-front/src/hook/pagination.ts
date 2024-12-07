import {useEffect, useState} from "react";

// 커스텀 훅
export const usePagination = (countPerPage: number) => {
    //state: 현재 페이지 상태
    const [currentPage, setCurrentPage] = useState<number>(1);
    //state: 전체 댓글의 갯수
    const [totalCount, setTotalCount] = useState<number>(1);

    //state: 전체 페이지 리스트
    const [totalPageList, setTotalPageList] = useState<number[]>([]);
    //state: 보여줄 페이지 리스트 상태  == 보여줄 색션
    const [viewPageList, setViewPageList] = useState<number[]>([]);

    //state: 현재 색션  >> 숫자가 많으면 잘리는 것을 대비 이 숫자를 기준으로 색션을 구함
    const [currentSection, setCurrentSection] = useState<number>(1);
    //state: 전체 색션
    const [totalSection, setTotalSection] = useState<number>(1);


    // 보여지는 색션을 구하는 함수 1색션 == 10개  1번색션 1~10 2번 색션 11 ~ 20까지
    // 하지만 배열상의 인덱스는 0부터 시작함을 잊지말자.
    const setViewPage = () => {
        const startIdx = 10 * (currentSection - 1);
        const endIdx = (10 * currentSection) > totalCount ? totalCount : (10 * currentSection);
        const viewPageList = totalPageList.slice(startIdx, endIdx);

        setViewPageList(viewPageList);
    }


    // 전체 댓글 갯수가 변경될 때마다 갱신함.
    useEffect(() => {
        const totalPage = Math.ceil(totalCount / countPerPage);
        const totalSection = Math.ceil(totalCount / (countPerPage * 10)) // 1색션== 10개의 번호
        const pageList: number[] = [];

        for (let page = 1; page <= totalPage; page++) pageList.push(page)  // 전체 페이지 리스트를 만들고

        setTotalPageList(pageList);
        setTotalSection(totalSection)


    }, [totalCount ,countPerPage]);

    useEffect(() => {
        setViewPage();
    }, [totalPageList, currentSection]);


    return {
        totalCount,
        currentPage,
        currentSection,
        viewPageList,
        setTotalCount,
        setCurrentPage,
        setCurrentSection
    };

}

export default usePagination;