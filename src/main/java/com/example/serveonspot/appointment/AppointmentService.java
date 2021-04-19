package com.example.serveonspot.appointment;

import com.example.serveonspot.specialist.Specialist;
import com.example.serveonspot.specialist.SpecialistInfoOutput;
import com.example.serveonspot.user.AppUser;

import java.util.List;

public interface AppointmentService {

    List<AppointmentInfoOutput> getOngoingAppointmentsByUserRole(AppUser appUser);

    List<SpecialistInfoOutput> getSpecialists();

    AppointmentInfoOutput registerAnAppointment(Integer specialistId);

    AppointmentInfoOutput unregisterAnAppointment(Integer appointmentId);

    AppointmentInfoOutput getAnAppointment(Integer appointmentId);

    AppointmentInfoOutput startAnAppointment(Integer appointmentId);

    AppointmentInfoOutput finishAnAppointment(Integer appointmentId);

    AppointmentInfoOutput cancelAnAppointment(Integer appointmentId);
}
