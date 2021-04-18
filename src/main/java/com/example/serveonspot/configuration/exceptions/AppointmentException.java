package com.example.serveonspot.configuration.exceptions;

public class AppointmentException extends RuntimeException{
    public AppointmentException(String errorMessage) {
        super(errorMessage);
    }
}
