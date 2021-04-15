package com.example.serveonspot.services;

import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialistServiceImpl implements SpecialistService {
    private final SpecialistRepository specialistRepository;

    public SpecialistServiceImpl(SpecialistRepository specialistRepository) {
        this.specialistRepository = specialistRepository;
    }

    @Override
    public Specialist logIn(String specialistType) {
        Specialist specialist = new Specialist(specialistType);
        specialist.setWorking(true);
        specialist = specialistRepository.save(specialist);

        return specialist;
//        Optional<Specialist> optionalSpecialist = specialistRepository.findById(Long.valueOf(specialistId));
//        if (optionalSpecialist.isPresent()) {
//            Specialist specialist = optionalSpecialist.get();
//            specialist.setWorking(true);
//            return   specialistRepository.save(specialist);
//        } else {
//            return null;
//        }
    }

    @Override
    public void logOut(int specialistId) {

    }


}
