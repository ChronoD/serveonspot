package com.example.serveonspot.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Specialist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int specialistId;
    private String specialistType;

    private boolean isWorking;

//    @OneToMany
//    private List<Customer> customers=new ArrayList<>();

    public Specialist( String specialistType) {
        this.specialistType = specialistType;
        this.isWorking = true;
    }

}
