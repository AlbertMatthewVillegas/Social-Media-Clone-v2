package com.zerofuku.socialmediaclone.exceptions;

public class AccountAlreadyExistsException extends RuntimeException {
    public AccountAlreadyExistsException(){
        super("Account Already Exists!");
    }
}
