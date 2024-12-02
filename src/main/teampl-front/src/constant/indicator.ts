// api 호출 URL에 대한 식별자

//auth
export const EMAIL_AUTH_URL = () => "/api/v1/auth/auth-code";
export const AUTH_CODE_CONFIRM_URL = () => "/api/v1/auth/confirm-code";
export const SIGN_UP_URL = () => "/api/v1/auth/sign-up";
export const SIGN_IN_URL = () => "/api/v1/auth/sign-in";
export const LOGIN_USER_URL = () => "/api/v1/user/login-user";

//project
export const CREATE_PERSONAL_PROJECT_URL = () => "/api/v1/project/create-project";
export const GET_PERSONAL_PROJECT_LIST_URL = () => "/api/v1/project/personal-project" //수정요망
export const GET_PERSONAL_PROJECT_INFO_URL = (projectNum: string) => `/api/v1/project/personal-project-info/${projectNum}`;



// issue
export const CREATE_PERSONAL_ISSUE = () => "/create-issue";
export const GET_PERSONAL_ISSUE_LIST = (projectNum: string) => `/issue-list/${projectNum}`;
export const GET_PERSONAL_ISSUE_BY_STATUS =
    (projectNum:string,status:number)=>`/issue-list/${projectNum}/${status}`;
export const GET_PERSONAL_ISSUE_BY_NUMBER =(issueNum:number) => `/${issueNum}`;
export const PATCH_ISSUE_TITLE = ()=>"/modification/issue-title";
export const PATCH_ISSUE_PRIORITY =()=>"/modification/issue-priority";
export const PATCH_ISSUE_STATUS = ()=> "/modification/issue-status";
export const PATCH_ISSUE_CATEGORY = () =>"/modification/issue-category";
export const PATCH_ISSUE_EXPIRE_DATE = ()=>"/modification/issue-expire-date";
export const PATCH_ISSUE_DETAIL = () =>"/modification/issue-detail";
export const POST_ISSUE_COMMENT =()=> "/create/issue-comment";



