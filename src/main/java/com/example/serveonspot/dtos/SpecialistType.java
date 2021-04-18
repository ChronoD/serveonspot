package com.example.serveonspot.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum SpecialistType {
    @JsonProperty("1 minutės")
    ONE_MINUTE(1),
    @JsonProperty("5 minučių")
    FIVE_MINUTES(5),
    @JsonProperty("9 minučių")
    NINE_MINUTES(9);
    private int minutes;

    private SpecialistType(int minutes) {
        this.minutes = minutes;
    }

    public int getMinutes() {
        return minutes;
    }
}
