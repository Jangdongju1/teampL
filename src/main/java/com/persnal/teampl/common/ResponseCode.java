package com.persnal.teampl.common;

public interface ResponseCode {

    //200
    String SUCCESS = "SU";

    //400
    String BAD_REQUEST = "VF";
    String EXIST_USER = "EU";
    String NOT_EXIST_USER = "NEU";
    String EXPIRE_AUTH_CODE="EAC";
    String ALREADY_SENT = "AS";

    // http code 401
    String SIGN_IN_FAILED = "SF";
    String AUTHENTICATION_FAILED = "AF";

    //403
    String NO_PERMISSION = "NP";

    // 404
    String NOT_EXIST_RESOURCE = "NR";
    //500
    String INITIAL_SERVER_ERROR = "IDE";

}
