package com.example.serveonspot.dtos;

import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.entities.Specialist;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class CustomerPositionOutput {
    private int appointmentId;
    private Specialist specialist;
    private AppointmentStatus status;
    private String waitingList;
    private int positionOnTheList;
    private String approximateTimeLeft;

    public CustomerPositionOutput(Appointment appointment, List<Appointment> appointmentList) {
        this.appointmentId = appointment.getAppointmentId();
        this.specialist = appointment.getSpecialist();
        this.status = appointment.getStatus();
        this.waitingList = getMessageByPositionOnList(appointmentList);
        int position = getPositionOnTheList(appointment, appointmentList);
        this.positionOnTheList = position;
        this.approximateTimeLeft = getApproximateTimeLeft(appointment.getSpecialist().getSpecialistType(), position);
    }

    private int getPositionOnTheList(Appointment appointment, List<Appointment> appointmentList) {
        return appointmentList.indexOf(appointment) + 1;
    }

    private String getMessageByPositionOnList(List<Appointment> appointmentList) {
        return appointmentList.stream()
                .map(a -> String.format("%03d", a.getAppointmentId()))
                .collect(Collectors.joining(" ,"));
    }

    private String getApproximateTimeLeft(SpecialistType specialistType, int position) {
        Duration d = Duration.ofMinutes(specialistType.getMinutes() * position);
        return "Iki vizito liko apie " + d.toMinutes() + " min.";
    }

}
