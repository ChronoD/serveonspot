package com.example.serveonspot.services;

import com.example.serveonspot.bin.EventService;
import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.CustomerPosition;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.CustomerRepository;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WaitingListImpl implements PublicWaitingList, PrivateWaitingList {
    private final SpecialistRepository specialistRepository;
    private final CustomerRepository customerRepository;
    private final EventService eventService;
    private final Deque<Customer> customerDeque = new ArrayDeque<>();
    private final Deque<Specialist> specialistDeque = new ArrayDeque<>();

    public WaitingListImpl(SpecialistRepository specialistRepository, CustomerRepository customerRepository, EventService eventService) {
        this.specialistRepository = specialistRepository;
        this.eventService = eventService;
        this.customerRepository = customerRepository;

    }


    @Override
    public List<Customer> getCustomersInLine(Integer lineLength) {
        if (lineLength != null) {
            return new ArrayList<>(customerDeque).subList(0, lineLength);
        }
        return new ArrayList<>(customerDeque);
    }

    @Override
    public List<Customer> getWaitingListBySpecialist(int specialistId) {
        return null;
    }

    @Override
    public CustomerPosition registerToTheWaitingList() {
        Customer customer = registerCustomer();
        customerDeque.add(customer);
        return getPosition(customer);
    }

    @Override
    public Customer getNextInLine() {
        return null;
    }

    @Override
    public CustomerPosition getPositionOnTheWaitingList(int customerId) {
        Customer customer = getCustomer(customerId);
        return getPosition(customer);
    }

    @Override
    public void unregisterFromTheWaitingList(int customerId) {
        Customer customer = getCustomer(customerId);
        customer.unregister();
        customerRepository.save(customer);
        customerDeque.remove(customer);
    }

    @Override
    public void returnToTheFrontOfTheLine(int customerId) {
        Customer customer = getCustomer(customerId);
        customer.cancelServing();
        customerRepository.save(customer);
        customerDeque.remove(customer);
    }

    private Customer getCustomer(int customerId) throws RuntimeException {
        Optional<Customer> customer = customerRepository.findById(Long.valueOf(customerId));
        if (customer.isPresent()) {
            return customer.get();
        } else {
            throw new RuntimeException("nerastas");
        }
    }

    private Customer registerCustomer() {
        Customer customer = new Customer(customerDeque.size());
        return customerRepository.save(customer);
    }


    private CustomerPosition getPosition(Customer customer) {
        return (new CustomerPosition(customer, new ArrayList(customerDeque)));
    }


}
