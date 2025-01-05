import {useEffect, useState} from "react";
// custom 훅.
const useCSPagination = <T>(countPerPage: number) => {
    // state: 전체 객체 리스트(제네릭 타입.)
    const [totalList, setTotalList] = useState<T[]>([]);//
    // state: 보여줄 객체 리스트
    const [viewList, setViewList] = useState<T[]>([]);//
    // state: 현재 페이지 번호 상태.
    const [currentPage, setCurrentPage] = useState<number>(1);

    // state: 전제 페이지 번호 리스트 상태.
    const [totalPageList, setTotalPageList] = useState<number[]>([]);
    // state: 보여줄 페이지 번호 리스트 상태.
    const [viewPageList, setViewPageList] = useState<number[]>([]);
    // state: 현재 페이지의 섹션 상태
    const [currentSection, setCurrentSection] = useState<number>(1);
    // state: 전체 섹션 상태.
    const [totalSection, setTotalSection] = useState<number>(1);

    // function : 보여줄 페이지 리스트 추출 함수
    const setViewPage = () => {
        const START_INDEX = 10 * (currentSection - 1);
        const END_INDEX = (10 * currentSection)  > totalPageList.length ? totalPageList.length : (10 * currentSection);
        const pageList = totalPageList.slice(START_INDEX, END_INDEX);
        setViewPageList(pageList);
    }



    // function : 보여줄 객체 리스트 추출 함수
    const setView = () => {
        const START_INDEX = countPerPage * (currentPage - 1);
        const END_INDEX = (countPerPage * currentPage)  > totalList.length ? totalList.length : (countPerPage * currentPage);
        const VIEW_LIST = totalList.slice(START_INDEX, END_INDEX);  // 특정 페이지 번호 클릭시 보여줄 리스트.

        setViewList(VIEW_LIST);
    }


    // effect: totalList 변경 시마다 실행할 작업
    useEffect(() => {
        //if (totalList.length === 0) return; // totalList가 비어있으면 처리하지 않음

        // 전체 페이지 수 계산
        const totalPage = Math.ceil(totalList.length / countPerPage);
        // 전체 섹션 수 계산 (1섹션당 10페이지)
        const totalSection = Math.ceil(totalPage / 10);

        // 전체 페이지 리스트 만들기
        const totalPageList = [];
        for (let page = 1; page <= totalPage; page++) totalPageList.push(page);
        // 상태 업데이트
        setTotalPageList(totalPageList);


        setTotalSection(totalSection);

        // 초기 페이지 설정
        setCurrentPage(1);
        setCurrentSection(1);


    }, [totalList, countPerPage]);

    // effect: totalPageList 변경 시마다 실행할 작업
    useEffect(() => {
      //  if (totalPageList.length === 0) return;
        // 페이지 리스트와 보여줄 데이터 세팅
        setViewPage();
        setView();
    }, [totalPageList]); // totalPageList가 바뀔 때마다 veiwPageList를 다시 계산

    // effect: currentPage 변경 시마다 실행할 작업
    useEffect(() => {
        setView();
    }, [currentPage]);

    // effect: currentSection 변경 시마다 실행할 작업
    useEffect(() => {
        setViewPage();
    }, [currentSection]);

    return {
        currentPage,
        currentSection,
        setCurrentPage,
        setCurrentSection,
        viewList,
        viewPageList,
        totalSection,
        setTotalList
    };
}

export default useCSPagination;
