package com.example.serveonspot.dtos;

import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.entities.Specialist;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class CustomerPositionOutput {
    private int appointmentId;
    private Specialist specialist;
    private int positionOnTheList;
    private String message;

    public CustomerPositionOutput(Appointment appointment, List<Appointment> appointmentList) {
        this.appointmentId=appointment.getAppointmentId();
        this.specialist = appointment.getSpecialist();
        int index = appointmentList.indexOf(appointment);
        this.positionOnTheList = (index + 1);
        String customersLine = appointmentList.stream()
                .map(a -> String.format("%03d", a.getAppointmentId()))
                .collect(Collectors.joining(" ,"));
        this.message = String.format("Jūsų numeris: %s, vieta eilėje: %d. Visa eilė: %s.", appointment, (index + 1), customersLine);
    }
}
