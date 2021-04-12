package com.example.serveonspot.bin;

import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final EventService eventService;

    public CustomerService(CustomerRepository customerRepository, EventService eventService) {
        this.eventService = eventService;
        this.customerRepository = customerRepository;
    }



    public Customer updateCustomer(long id) {
        Optional<Customer> customer = customerRepository.findById(id);

        if (customer.isPresent()) {
            Customer c = customer.get();
            c.setStartedVisit(LocalDateTime.now());
            customerRepository.save(c);
            eventService.publishEvent(Event.builder()
                    .userId(String.valueOf(c.getCustomerId()))
                    .content("updated")
                    .build());
            return c;
        } else {
            return null;
        }
    }

    public Customer trackCustomer(Long id) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            return optionalCustomer.get();
        } else {
            return null;
        }
    }


}
