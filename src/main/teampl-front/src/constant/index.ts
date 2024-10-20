export const AUTH_PATH =  () =>"/auth";
export const SIGN_IN_PATH = () =>"sign-in";
export const PASSWORD_REGISTRATION_PATH  = (email:string) => `reg-password/${email}`;
export const AUTHENTICATION_CODE_CONFIRM_PATH = (email : string) => `confirm-code/${email}`;
export const MAIN_PATH = (email : string) =>  `/teamPL/${email}`;


