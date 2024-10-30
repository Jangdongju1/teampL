enum ApiEndPoint{
    EMAIL_AUTH_PATH= "/api/v1/auth/auth-code",
    AUTH_CODE_CONFIRM_PATH = "/api/v1/auth/confirm-code",
    SIGN_UP = "/api/v1/auth/sign-up",
    SIGN_IN = "/api/v1/auth/sign-in",
    LOGIN_USER="/api/v1/user/login-user",
    CREATE_PROJECT="/api/v1/project/create-project",
    GET_PERSONAL_PROJECT_LIST= "/api/v1/project/personal-project"
}
export default ApiEndPoint;