package com.example.serveonspot.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class AppointmentStatusInput {

    private AppointmentStatus status;
}
