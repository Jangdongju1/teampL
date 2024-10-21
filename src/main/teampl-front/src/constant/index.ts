export const AUTH_PATH = () => "/auth";
export const SIGN_IN_PATH = () => "sign-in";
export const PASSWORD_REGISTRATION_PATH = (email: string) => `reg-password/${email}`;
export const AUTHENTICATION_CODE_CONFIRM_PATH = (email: string) => `confirm-code/${email}`;
export const HOME_PATH = () => `/teamPL`;
export const PERSONAL_PAGE_PATH = (email: string) => `${email}`;
export const PERSONAL_PROJECT_HOME_PATH = (email: string) => `${email}/personal-project`;
export const PERSONAL_PROJECT_BOARD_PATH = (email: string, projectNum: string) =>
    `${PERSONAL_PROJECT_HOME_PATH(email)}/${projectNum}`;





