package com.example.serveonspot.services;

import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.CustomerPosition;

import java.util.List;

public interface PublicWaitingList {

    List<Customer> getCustomersInLine(Integer lineLength);
    CustomerPosition registerToTheWaitingList();
    CustomerPosition getPositionOnTheWaitingList(int customerId);
    void unregisterFromTheWaitingList(int customerId);

}
