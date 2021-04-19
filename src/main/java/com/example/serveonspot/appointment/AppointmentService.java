package com.example.serveonspot.appointment;

import com.example.serveonspot.specialist.Specialist;
import com.example.serveonspot.specialist.SpecialistInfoOutput;

import java.util.List;

public interface AppointmentService {

    List<SpecialistInfoOutput> getSpecialists();

    AppointmentInfoOutput registerAnAppointment(Integer specialistId);

    AppointmentInfoOutput unregisterAnAppointment(Integer appointmentId);

    AppointmentInfoOutput getAnAppointment(Integer appointmentId);

    List<AppointmentInfoOutput> getOngoingAppointmentsBySpecialist(Specialist specialist);

    AppointmentInfoOutput startAnAppointment(Integer appointmentId);

    AppointmentInfoOutput finishAnAppointment(Integer appointmentId);

    AppointmentInfoOutput cancelAnAppointment(Integer appointmentId);

    List<AppointmentInfoOutput> getOngoingAppointmentsByAdminRole();
}
