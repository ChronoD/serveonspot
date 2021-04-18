package com.example.serveonspot.appointment;

import com.example.serveonspot.specialist.Specialist;
import com.example.serveonspot.specialist.SpecialistType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class AppointmentInfoOutput {
    private int appointmentId;
    private Specialist specialist;
    private AppointmentStatus status;
    private String waitingList;
    private int positionOnTheList;
    private String approximateTimeLeft;

    public AppointmentInfoOutput(Appointment appointment, List<Appointment> appointmentList) {
        this.appointmentId = appointment.getAppointmentId();
        this.specialist = appointment.getSpecialist();
        AppointmentStatus appointmentStatus = appointment.getStatus();
        this.status = appointmentStatus;
        this.waitingList = getMessageByPositionOnList(appointmentList);
        int position = getPositionOnTheList(appointment, appointmentList);
        this.positionOnTheList = position;
        this.approximateTimeLeft = getApproximateTimeLeft(appointment.getSpecialist().getSpecialistType(), position, appointmentStatus);
    }

    private int getPositionOnTheList(Appointment appointment, List<Appointment> appointmentList) {
        return appointmentList.indexOf(appointment);
    }

    private String getMessageByPositionOnList(List<Appointment> appointmentList) {
        return appointmentList.stream()
                .map(a -> String.format("%03d", a.getAppointmentId()))
                .collect(Collectors.joining(" ,"));
    }

    private String getApproximateTimeLeft(SpecialistType specialistType, int position, AppointmentStatus status) {
        switch (status) {
            case REGISTERED:
                Duration d = Duration.ofMinutes(specialistType.getMinutes() * position);
                return "Iki vizito liko apie " + d.toMinutes() + " min.";
            case UNREGISTERED:
                return "Vizitas buvo atšauktas";
            case STARTED:
                return "Vizitas prasidėjo";
            case FINISHED:
                return "Vizitas pasibaigė";
            case CANCELLED:
                return "Specialistas atšaukė vizitą";
            default:
                return "";
        }
    }
}
