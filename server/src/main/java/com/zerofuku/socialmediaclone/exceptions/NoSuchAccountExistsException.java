package com.zerofuku.socialmediaclone.exceptions;

public class NoSuchAccountExistsException extends RuntimeException {
    public NoSuchAccountExistsException(){
        super("Account Not Found!");
    }

    public NoSuchAccountExistsException(String message){
        super(message);
    }
}


