package com.example.serveonspot.services;

import com.example.serveonspot.bin.EventService;
import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecialistServiceImpl implements SpecialistService {
    private final SpecialistRepository specialistRepository;
    //    private final EventService eventService;
    private final PrivateWaitingList privateWaitingList;

    public SpecialistServiceImpl(SpecialistRepository specialistRepository, EventService eventService, PrivateWaitingList privateWaitingList) {
//        this.eventService = eventService;
        this.specialistRepository = specialistRepository;
        this.privateWaitingList = privateWaitingList;
    }

    @Override
    public Specialist logIn(int specialistId) {
        Optional<Specialist> optionalSpecialist = specialistRepository.findById(Long.valueOf(specialistId));
        if (optionalSpecialist.isPresent()) {
            Specialist specialist = optionalSpecialist.get();
            specialist.setWorking(true);
            specialistRepository.save(specialist);
//            eventService.publishEvent(Event.builder()
//                    .userId(String.valueOf(specialist.getId()))
//                    .content("specialist active")
//                    .build());
            return specialist;
        } else {
            return null;
        }
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
