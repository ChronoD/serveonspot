package com.example.serveonspot.appointment;

import com.example.serveonspot.specialist.Specialist;
import com.example.serveonspot.user.AppUser;

import java.util.List;

public interface AppointmentService {

    List<Appointment> getOngoingAppointmentsByUserRole(AppUser appUser);

    List<Specialist> getSpecialists();

    AppointmentInfoOutput registerAnAppointment(Integer specialistId);

    void unregisterAnAppointment(Integer appointmentId);

    AppointmentInfoOutput getAnAppointment(Integer appointmentId);

    void startAnAppointment(Integer appointmentId);

    void finishAnAppointment(Integer appointmentId);

    void cancelAnAppointment(Integer appointmentId);
}
