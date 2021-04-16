package com.example.serveonspot.dtos;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AppointmentBookingInput {

    @NotNull
    private Integer specialistId;
}
