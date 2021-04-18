package com.example.serveonspot.services;

import com.example.serveonspot.entities.AppUser;
import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.dtos.CustomerPositionOutput;
import com.example.serveonspot.entities.Specialist;

import java.util.List;

public interface AppointmentService {

    List<Appointment> watchOngoingAppointmentsByUser(AppUser appUser);

    List<Specialist> watchWorkingSpecialists();
    CustomerPositionOutput registerAnAppointment(Integer specialistId);
    void unregisterAnAppointment(Integer appointmentId);
    CustomerPositionOutput watchAnAppointment(Integer appointmentId);

    void startAnAppointment(Integer appointmentId);
    void finishAnAppointment(Integer appointmentId);
    void cancelAnAppointment(Integer appointmentId);
}
