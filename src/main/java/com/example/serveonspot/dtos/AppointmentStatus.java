package com.example.serveonspot.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AppointmentStatus {

    @NotBlank
    private String status;
}
