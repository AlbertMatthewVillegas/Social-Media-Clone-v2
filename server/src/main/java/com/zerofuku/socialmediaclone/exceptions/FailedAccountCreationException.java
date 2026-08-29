package com.zerofuku.socialmediaclone.exceptions;

public class FailedAccountCreationException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public FailedAccountCreationException() {
        super();
    }

    public FailedAccountCreationException(String message) {
        super(message);
    }

    public FailedAccountCreationException(String message, Throwable cause) {
        super(message, cause);
    }

    public FailedAccountCreationException(Throwable cause) {
        super(cause);
    }
}
