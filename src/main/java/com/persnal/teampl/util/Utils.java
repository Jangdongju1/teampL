package com.persnal.teampl.util;

public class Utils {
    public static String getStackTrace(Exception e) {
        StackTraceElement[] element = e.getStackTrace();
        StringBuffer str = new StringBuffer();

        for (int i = 0; i < element.length; i++) {
            if (i >= element.length)
                break;

            if (i == 0) {
                str.append(e.toString()).append("\n");

                str.append(element[i].getClassName()).append(" : ")
                        .append(e.getLocalizedMessage()).append("\n");
            }

            str.append("\tat ")
                    .append(element[i].getClassName()).append(".")
                    .append(element[i].getMethodName())
                    .append("(").append(element[i].getFileName())
                    .append(":").append(element[i].getLineNumber()).append(")");

            if (i != (element.length - 1))
                str.append("\n");
        }
        element = null;
        return str.toString();
    }
}
