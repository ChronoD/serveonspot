package com.example.serveonspot.appointment;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AppointmentRegistrationInput {

    @NotNull
    private Integer specialistId;
}
