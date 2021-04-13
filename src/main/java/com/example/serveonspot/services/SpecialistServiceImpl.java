package com.example.serveonspot.services;

import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialistServiceImpl implements SpecialistService {
    private final SpecialistRepository specialistRepository;
    private final PrivateWaitingList privateWaitingList;

    public SpecialistServiceImpl(SpecialistRepository specialistRepository, PrivateWaitingList privateWaitingList) {
        this.specialistRepository = specialistRepository;
        this.privateWaitingList = privateWaitingList;
    }

    @Override
    public Specialist logIn(int specialistId) {
        Specialist specialist = new Specialist(Long.valueOf(specialistId));
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

    @Override
    public List<Specialist> getWorkingSpecialists() {
        return specialistRepository.findByIsWorkingTrue();
    }

    @Override
    public List<Customer> getWaitingList(int specialistId) {
        return privateWaitingList.getWaitingListBySpecialist(specialistId);
    }

    @Override
    public Customer startServingCustomer(int specialistId, int customerId) {
        return null;
    }

    @Override
    public Customer cancelServingCustomer(int specialistId, int customerId) {
        return null;
    }

    @Override
    public Customer endServingCustomer(int specialistId, int customerId) {
        return null;
    }


}
