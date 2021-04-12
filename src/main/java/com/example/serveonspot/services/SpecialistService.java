package com.example.serveonspot.services;

import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.CustomerPosition;
import com.example.serveonspot.entities.Specialist;

import java.util.List;

public interface SpecialistService {
    Specialist logIn(int specialistId);
    void logOut(int specialistId);
    List<Specialist> getWorkingSpecialists();
    List<Customer> getWaitingList(int specialistId);
    Customer startServingCustomer(int specialistId,int customerId);
    Customer cancelServingCustomer(int specialistId,int customerId);
    Customer endServingCustomer(int specialistId,int customerId);
}
