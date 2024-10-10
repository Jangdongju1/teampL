enum ResponseCode {
    SUCCESS = "SU",
    BAD_REQUEST = "VF",
    SIGN_IN_FAILED = "SF",
    AUTHENTICATION_FAILED = "AF",
    NO_PERMISSION = "NP",
    INITIAL_SERVER_ERROR = "IDE",
    EXIST_USER = "EU",
    EXPIRE_AUTH_CODE = "EAC",
    ALREADY_SENT = "AS"

}

export default ResponseCode;