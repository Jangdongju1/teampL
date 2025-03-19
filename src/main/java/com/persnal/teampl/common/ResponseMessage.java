package com.persnal.teampl.common;

public interface ResponseMessage {
    String SUCCESS = "Success.";
    String BAD_REQUEST = "Bad Request.";
    String SIGN_IN_FAILED = "Information for Login is mismatched.";
    String NOT_EXIST_USER = "This User does not exist.";
    String AUTHENTICATION_FAILED = "Authentication Failed.";
    String NO_PERMISSION = "You do not have permission to perform this operation.";
    String INITIAL_SERVER_ERROR = "Initial Server Error.";
    String EXIST_USER = "User already exists.";
    String EXPIRE_AUTH_CODE ="AuthCode is expired." ;
    String ALREADY_SENT = "Request Already Sent.";
    String LOGIN_USER = "Verified User";
    String NOT_EXIST_RESOURCE = "Resource does not exist.";
    String NOT_EXIST_PROJECT = "Project does not exist.";
    String NOT_EXIST_ISSUE = "Issue does not exist.";
    String NOT_EXIST_TEAM = "This Team does not exist.";
    String NOT_VALID_ARGUMENT ="Argument is not valid.";
    String PASSWORD_NOT_MATCHED = "Password does not match.";

}
