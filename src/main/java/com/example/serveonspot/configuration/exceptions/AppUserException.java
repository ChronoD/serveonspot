package com.example.serveonspot.configuration.exceptions;

public class AppUserException extends RuntimeException {
    public AppUserException(String errorMessage) {
        super(errorMessage);
    }
}
