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
export const CREATE_PERSONAL_PROJECT = () => "";
export const CREATE_TEAM_PROJECT = () => "/team-project"
export const GET_PROJECT_LIST = () => `/project-list`;
export const GET_PERSONAL_PROJECT_LIST = () => "/personal-project-list "
export const GET_PERSONAL_PROJECT_INFO = (projectNum: string) => `/project-info/${projectNum}`;
export const GET_TEAM_PROJECT_LIST = (regNum: string) => `/team-project-list?regNum=${regNum}`;


// issue
export const CREATE_PERSONAL_ISSUE = () => "";
export const GET_PERSONAL_ISSUE_LIST = (projectNum: string) => `/issue-list/${projectNum}`;
export const GET_PERSONAL_ISSUE_BY_STATUS =
    (projectNum: string, status: number) => `/issue-list/${projectNum}/${status}`;
export const GET_PERSONAL_ISSUE_INFO = (issueNum: number) => `/${issueNum}`;
export const GET_TEAM_ISSUE_ISSUE_INFO = (issueNum: string, regNum: string) => `/team-issue-detail?issueNum=${issueNum}&regNum=${regNum}`;
export const PATCH_ISSUE_TITLE = () => "/issue-title";
export const PATCH_ISSUE_PRIORITY = () => "/issue-priority";
export const PATCH_ISSUE_STATUS = () => "/issue-status";
export const PATCH_ISSUE_CATEGORY = () => "/issue-category";
export const PATCH_ISSUE_EXPIRE_DATE = () => "/issue-expire-date";
export const PATCH_ISSUE_DETAIL = () => "/issue-detail";
export const POST_ISSUE_COMMENT = () => "/issue-comment";
export const GET_ISSUE_COMMENT_LIST =
    (issueNum: number, page: number, perPage: number) => `/comment-list/${issueNum}?page=${page}&perPage=${perPage}`;
export const PATCH_ISSUE_COMMENT = () => "/issue-comment";
export const GET_TOTAL_COMMENT_COUNT =
    (issueNum: number) => `/total-comments-count/${issueNum}`;
export const PATCH_DRAG_ISSUE_STATUS = () => "/drag/issue-status";
export const PATCH_ISSUE_IN_CHARGE = () => "/in-charge";
export const DELETE_ISSUE = (issueNum: string, projectNum: string) => `?issueNum=${issueNum}&projectNum=${projectNum}`;


// team
export const CREATE_TEAM = () => "";
export const GET_TEAM = () => "/team-list";
export const GET_TEAM_MEMBER = (regNum: string) => `/team-member?regNum=${regNum}`;
export const POST_INVITATION_TEAM_MEMBER = () => "/invitation-member";
export const POST_REGISTRATION_MEMBER = () => "/registration-member";


// user
export const GET_SEARCH_USER = (word: string) => `/search-user?word=${word}`;
export const GET_INVITATION_LIST = () => `/invitation-list`;
export const PATCH_PROFILE_IMAGE = () => `/profile-image`
export const PATCH_NICKNAME = () => `/nickname`;
export const PATCH_PASSWORD = () => `/password`;
