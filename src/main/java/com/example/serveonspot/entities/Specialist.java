package com.example.serveonspot.entities;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int specialistId;
    private String specialistType;
    private String specialistInfo;


    public Specialist(String specialistType) {
        this.specialistType = specialistType;
        this.specialistInfo = generateSpecialistInfo(specialistType);
    }

    private String generateSpecialistInfo(String specialistType) {
        return "Vidutiniškai " + specialistType + " minučių specialistas";
    }
}
