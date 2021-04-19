package com.example.serveonspot.appointment;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AppointmentStatus {
    @JsonProperty("REGISTERED")
    REGISTERED,
    @JsonProperty("UNREGISTERED")
    UNREGISTERED,
    @JsonProperty("STARTED")
    STARTED,
    @JsonProperty("FINISHED")
    FINISHED,
    @JsonProperty("CANCELLED")
    CANCELLED
}