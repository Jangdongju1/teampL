export const AUTH_PATH = () => "/auth";
export const SIGN_IN_PATH = () => "sign-in";
export const PASSWORD_REGISTRATION_PATH = (email: string) => `reg-password/${email}`;
export const AUTHENTICATION_CODE_CONFIRM_PATH = (email: string) => `confirm-code/${email}`;
export const HOME_PATH = () => `/teamPL`;
export const TEAM_PATH = () => "team";
export const PERSONAL_PAGE_PATH = () => "personal";
export const PERSONAL_PAGE_INVITATION = (email: string) => `invitation/${email}`;
export const PERSONAL_PROJECT_HOME_PATH = (email: string) => `${email}/personal-project`;
export const PERSONAL_PROJECT_BOARD_PATH = (email: string, projectNum: string) => `${email}/personal-project/${projectNum}`;
export const TEAM_MAIN_PATH = (email: string) => `${HOME_PATH()}/${TEAM_PATH()}/${email}`;
export const TEAM_PROJECT_PATH = (email: string, regNum: string) => `${TEAM_MAIN_PATH(email)}/${regNum}/project`;
export const TEAM_PROJECT_BOARD_PATH = (regNum: string, creator: string, projectNum: string) => `${regNum}/${creator}/board/${projectNum}`




