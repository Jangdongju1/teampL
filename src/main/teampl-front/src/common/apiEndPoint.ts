export const EMAIL_AUTH_URL = () => "/api/v1/auth/auth-code";
export const AUTH_CODE_CONFIRM_URL = () => "/api/v1/auth/confirm-code";
export const SIGN_UP_URL = () => "/api/v1/auth/sign-up";
export const SIGN_IN_URL = () => "/api/v1/auth/sign-in";
export const LOGIN_USER_URL = () => "/api/v1/user/login-user";
export const CREATE_PERSONAL_PROJECT_URL = () => "/api/v1/project/create-project";
export const GET_PERSONAL_PROJECT_LIST_URL = () => "/api/v1/project/personal-project" //수정요망
export const GET_PERSONAL_PROJECT_INFO_URL = (projectNum: string) => `/api/v1/project/personal-project-info/${projectNum}`;
export const CREATE_PERSONAL_ISSUE_URL = () => "/api/v1/issue/create-issue";
export const GET_PERSONAL_ISSUE_LIST_URL = (projectNum: string) => `/api/v1/issue/issue-list/${projectNum}`;
export const GET_PERSONAL_ISSUE_BY_STATUS_URL =
    (projectNum:string,status:number)=>`/api/v1/issue/issue-list/${projectNum}/${status}`;  // 사용안함
export const GET_PERSONAL_ISSUE_BY_NUMBER_URL =(issueNum:number) => `/api/v1/issue/${issueNum}`;
export const PATCH_ISSUE_TITLE_URL = ()=>"/api/v1/issue/modification/issue-title";
export const PATCH_ISSUE_PRIORITY_URL =()=>"/api/v1/issue/modification/issue-priority";


