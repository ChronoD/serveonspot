package com.example.serveonspot.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Specialist {

    @Id
    private Long specialistId;
    private boolean isWorking;

    @OneToMany
    private List<Customer> customers;

    public Specialist(Long specialistId) {
        this.specialistId = specialistId + 1;
        this.isWorking = true;
    }

    private void startServing(Customer customer) {
        customer.startServing();
    }

    private void endServing(Customer customer) {
        customer.endServing(this);
        customers.add(customer);
    }

    private void cancelServing(Customer customer) {
        customer.cancelServing();
    }
}
