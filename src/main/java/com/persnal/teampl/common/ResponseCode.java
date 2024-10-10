package com.persnal.teampl.common;

public interface ResponseCode {

    //200
    String SUCCESS = "SU";

    //400
    String BAD_REQUEST = "VF";

    // http code 401
    String SIGN_IN_FAILED = "SF";
    String AUTHENTICATION_FAILED = "AF";

    //403
    String NO_PERMISSION = "NP";
    //500
    String INITIAL_SERVER_ERROR = "IDE";
    String EXIST_USER = "EU";
    String EXPIRE_AUTH_CODE="EAC";
    String ALREADY_SENT = "AS";
}
