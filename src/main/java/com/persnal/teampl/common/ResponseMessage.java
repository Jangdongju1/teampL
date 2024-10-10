package com.persnal.teampl.common;

public interface ResponseMessage {
    String SUCCESS = "Success.";
    String BAD_REQUEST = "Bad Request.";
    String SIGN_IN_FAILED = "Information for Login is mismatched.";
    String AUTHENTICATION_FAILED = "Authentication Failed.";
    String NO_PERMISSION = "You do not have permission to perform this operation.";
    String INITIAL_SERVER_ERROR = "Initial Server Error.";
    String EXIST_USER = "User already exists.";
    String EXPIRE_AUTH_CODE ="AuthCode is expired." ;
    String ALREADY_SENT = "Email Already Sent.";

}
