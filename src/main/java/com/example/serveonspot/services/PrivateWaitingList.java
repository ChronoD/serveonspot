package com.example.serveonspot.services;

import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.CustomerPosition;

import java.util.List;

public interface PrivateWaitingList extends PublicWaitingList{
    List<Customer> getWaitingListBySpecialist(int specialistId);
    Customer getNextInLine();
    void returnToTheFrontOfTheLine(int customerId);
}
