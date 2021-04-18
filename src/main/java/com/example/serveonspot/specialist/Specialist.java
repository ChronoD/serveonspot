package com.example.serveonspot.specialist;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
public class Specialist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int specialistId;
    private SpecialistType specialistType;
    private String specialistInfo;

    public Specialist(SpecialistType type) {
        this.specialistInfo = generateSpecialistInfo(type);
        this.specialistType = type;
    }

    private String generateSpecialistInfo(SpecialistType type) {
        return type + " min. specialistas";
    }
}
