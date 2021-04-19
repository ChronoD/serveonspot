package com.example.serveonspot.specialist;

public enum SpecialistType {
    ONE_MINUTE(1),
    FIVE_MINUTES(5),
    NINE_MINUTES(9);

    private final int minutes;

    SpecialistType(int minutes) {
        this.minutes = minutes;
    }

    public int getMinutes() {
        return minutes;
    }
}
