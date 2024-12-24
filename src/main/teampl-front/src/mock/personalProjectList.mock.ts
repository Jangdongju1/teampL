import {Project} from "../interface/types";

const PersonalProjectListMock: Project[] = [
    {
        projectNum: 1,
        regNum : 1,
        projectName : "테스트 프로젝트",
        description : "프로젝트 설명",
        createDate : "프로젝트 생성일자",
        creator : "프로젝트 생성인",
        teamName : "팀이름",
        stat : 0,
        projectType : 0,
        processed : 0,
        unProcessed : 2,
        id:1 // 리액트 테이블용 아이디
    },
    {
        projectNum: 2,
        regNum : 2,
        projectName : "테스트 프로젝트2",
        description : "프로젝트 설명2",
        createDate : "프로젝트 생성일자2",
        creator : "프로젝트 생성인2",
        teamName : "팀이름2",
        stat : 0,
        projectType : 0,
        processed : 0,
        unProcessed : 2,
        id:1 // 리액트 테이블용 아이디
    },
]

export default PersonalProjectListMock;