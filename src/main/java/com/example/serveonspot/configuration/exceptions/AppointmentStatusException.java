package com.example.serveonspot.configuration.exceptions;

public class AppointmentStatusException extends RuntimeException{
    public AppointmentStatusException(String errorMessage) {
        super(errorMessage);
    }
}
