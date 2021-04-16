package com.example.serveonspot.services;

import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.dtos.CustomerPositionOutput;
import com.example.serveonspot.entities.Specialist;

import java.util.List;

public interface AppointmentService {

    List<Appointment> getOngoingAppointments(Integer lineLength);

    List<Appointment> getOngoingAppointmentsBySpecialist(Integer specialistId);

    List<Specialist> getWorkingSpecialists();
    CustomerPositionOutput registerAnAppointment(Integer specialistId);
    CustomerPositionOutput trackAnAppointment(Integer appointmentId);
    void unregisterAnAppointment(Integer appointmentId);

    void startAnAppointment(Integer appointmentId);
    void finishAnAppointment(Integer appointmentId);
    void cancelAnAppointment(Integer appointmentId);
}
