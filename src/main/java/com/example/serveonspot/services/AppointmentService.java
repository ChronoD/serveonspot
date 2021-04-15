package com.example.serveonspot.services;

import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.dtos.CustomerPosition;
import com.example.serveonspot.entities.Specialist;

import java.util.List;

public interface AppointmentService {

    List<Appointment> getOngoingAppointments(Integer lineLength);

    List<Appointment> getOngoingAppointmentsBySpecialist(Integer specialistId);

    List<Specialist> getWorkingSpecialists();
    CustomerPosition registerAnAppointment(Integer specialistId);
    void unregisterAnAppointment(Integer appointmentId);

    void cancelAnAppointment(Integer appointmentId);

    void startAnAppointment(Integer appointmentId);
    void finishAnAppointment(Integer appointmentId);
}
