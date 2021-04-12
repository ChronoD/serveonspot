package com.example.serveonspot.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class CustomerPosition {
    private String customerId;
    private List<Customer> customersList;
    private int positionOnTheList;
    private String message;

    public CustomerPosition(Customer customer, List<Customer> customersInLine) {
        this.customerId = String.valueOf(customer.getCustomerId());
        this.customersList = customersInLine;
        int index = customersInLine.indexOf(customer);
        String customerIdPadded = String.format("%03d", customer.getCustomerId());
        this.positionOnTheList = (index + 1);
        String customersLine = customersInLine.stream()
                .map(c -> String.format("%03d", c.getCustomerId()))
                .collect(Collectors.joining(" ,"));
        this.message = String.format("Jūsų numeris: %s, vieta eilėje: %d. Visa eilė: %s.", customerIdPadded, (index + 1), customersLine);
    }

    @Override
    public String toString() {
        return message;
    }
}
