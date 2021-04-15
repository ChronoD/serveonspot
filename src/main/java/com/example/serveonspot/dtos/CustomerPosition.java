package com.example.serveonspot.dtos;

import com.example.serveonspot.entities.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class CustomerPosition {
    private String customerId;
//    private List<Customer> customersList;
    private int positionOnTheList;
    private String message;

    public CustomerPosition(Appointment appointment, List<Appointment> appointmentList) {
//        this.customerId = String.valueOf(appointment.getCustomerId());
//        int index = appointmentList.indexOf(appointment);
//        String customerIdPadded = String.format("%03d", appointment.getCustomerId());
//        this.positionOnTheList = (index + 1);
//        String customersLine = appointmentList.stream()
//                .map(c -> String.format("%03d", c.getCustomerId()))
//                .collect(Collectors.joining(" ,"));
//        this.message = String.format("Jūsų numeris: %s, vieta eilėje: %d. Visa eilė: %s.", customerIdPadded, (index + 1), customersLine);
    }

    @Override
    public String toString() {
        return message;
    }
}
