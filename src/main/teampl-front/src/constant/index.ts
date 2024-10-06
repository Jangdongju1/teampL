export const AUTH_PATH =  () =>"/auth";
export const SIGN_IN_PATH = () =>"sign-in";

export const MAIN_PATH = (email : string) => `/${email}`;
export const PASSWORD_REGISTRATION_PATH  = () => "/reg-password";
export const AUTHENTICATION_CODE_CONFIRM_PATH = (email : string) => `confirm-code/${email}`;