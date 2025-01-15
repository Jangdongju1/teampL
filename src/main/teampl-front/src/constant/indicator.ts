// api 호출 URL에 대한 식별자

//common;
import {escapeRegExp} from "lodash";

export const DOMAIN = "http://localhost:4000"


//auth
export const EMAIL_AUTH_URL = () => "/api/v1/auth/auth-code";
export const AUTH_CODE_CONFIRM_URL = () => "/api/v1/auth/confirm-code";
export const SIGN_UP_URL = () => "/api/v1/auth/sign-up";
export const SIGN_IN_URL = () => "/api/v1/auth/sign-in";
export const LOGIN_USER_URL = () => "/api/v1/user/login-user";

//project
export const CREATE_PERSONAL_PROJECT = () => "/create-project";
export const CREATE_TEAM_PROJECT = () => "/create-team-project"
export const GET_PROJECT_LIST = () => `/project-list`; //수정요망
export const GET_PERSONAL_PROJECT_INFO = (projectNum: string) => `/personal-project-info/${projectNum}`;
export const GET_TEAM_PROJECT_LIST = (regNum : string)=>`/team-project-list?regNum=${regNum}`;


// issue
export const CREATE_PERSONAL_ISSUE = () => "/create-issue";
export const GET_PERSONAL_ISSUE_LIST = (projectNum: string) => `/issue-list/${projectNum}`;
export const GET_PERSONAL_ISSUE_BY_STATUS =
    (projectNum: string, status: number) => `/issue-list/${projectNum}/${status}`;
export const GET_PERSONAL_ISSUE_BY_NUMBER = (issueNum: number) => `/${issueNum}`;
export const PATCH_ISSUE_TITLE = () => "/modification/issue-title";
export const PATCH_ISSUE_PRIORITY = () => "/modification/issue-priority";
export const PATCH_ISSUE_STATUS = () => "/modification/issue-status";
export const PATCH_ISSUE_CATEGORY = () => "/modification/issue-category";
export const PATCH_ISSUE_EXPIRE_DATE = () => "/modification/issue-expire-date";
export const PATCH_ISSUE_DETAIL = () => "/modification/issue-detail";
export const POST_ISSUE_COMMENT = () => "/create/issue-comment";
export const GET_ISSUE_COMMENT_LIST =
    (issueNum: number, page: number, perPage: number) => `/comment-list/${issueNum}?page=${page}&perPage=${perPage}`;
export const PATCH_ISSUE_COMMENT = () => "/modification/issue-comment";
export const GET_TOTAL_COMMENT_COUNT =
    (issueNum: number) => `/total-comments-count/${issueNum}`;
export const PATCH_DRAG_ISSUE_STATUS = () => "/drag/modification/issue-status";


// team
export const CREATE_TEAM = () => "/create-team";
export const GET_TEAM = () => "/team-list";
export const GET_TEAM_MEMBER = (regNum:string)=> `/team-member?regNum=${regNum}`;
export const POST_INVITATION_TEAM_MEMBER = ()=>"/invitation-member";


// user
export const GET_SEARCH_USER =(word: string)=>`/search-user?word=${word}`;
export const GET_INVITATION_LIST = (email: string)=> `invitation-list?email=${email}`;