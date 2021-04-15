package com.example.serveonspot.services;

import com.example.serveonspot.entities.Specialist;

import java.util.List;

public interface SpecialistService {
    Specialist logIn(String specialistType);
    void logOut(int specialistId);
}
