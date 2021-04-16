package com.example.serveonspot.services;

import com.example.serveonspot.dtos.CustomerPositionOutput;
import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.AppointmentRepository;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final SpecialistRepository specialistRepository;
    private final AppointmentRepository appointmentRepository;
    private final Deque<Appointment> appointmentsDeque = new ArrayDeque<>();
    private final Deque<Specialist> specialistDeque = new ArrayDeque<>();

    public AppointmentServiceImpl(SpecialistRepository specialistRepository, AppointmentRepository appointmentRepository) {
        this.specialistRepository = specialistRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<Appointment> getOngoingAppointments(Integer lineLength) {
        return getOngoingAppointments();
    }

    @Override
    public List<Appointment> getOngoingAppointmentsBySpecialist(Integer specialistId) {
        return getOngoingAppointments().stream()
                .filter(a -> a.getSpecialist().getSpecialistId() == specialistId)
                .collect(Collectors.toList());
    }

    @Override
    public List<Specialist> getWorkingSpecialists() {
        return specialistRepository.findAll();
    }

    @Override
    public CustomerPositionOutput registerAnAppointment(Integer specialistId) {
        Specialist specialist = getWorkingSpecialistById(specialistId);
        Appointment appointment = appointmentRepository.save(new Appointment(specialist));
        List<Appointment> allAppointments = getOngoingAppointments();

        return new CustomerPositionOutput(appointment, allAppointments);
    }

    @Override
    public CustomerPositionOutput trackAnAppointment(Integer appointmentId) {
        Appointment customersAppointment = getOngoingAppointmentById(appointmentId);
        List<Appointment> allAppointments = getOngoingAppointments();
        return new CustomerPositionOutput(customersAppointment, allAppointments);
    }

    @Override
    public void unregisterAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.unregister();
        appointmentRepository.save(appointment);
    }

    @Override
    public void startAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.start();
        appointmentRepository.save(appointment);
    }

    @Override
    public void finishAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.finish();
        appointmentRepository.save(appointment);
    }

    @Override
    public void cancelAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.cancel();
        appointmentRepository.save(appointment);
    }

    private List<Appointment> getOngoingAppointments() {
        return appointmentRepository.findAll().stream()
                .filter(a -> appointmentIsOngoing(a))
                .collect(Collectors.toList());
    }

    private boolean appointmentIsOngoing(Appointment a) {
        return !a.isUnregistered() && !a.isFinished();
    }

    private Appointment getOngoingAppointmentById(Integer appointmentId) throws RuntimeException {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);
        if (appointmentOptional.isPresent()) {
            Appointment appointment = appointmentOptional.get();
            if (appointmentIsOngoing(appointment)) {
                return appointment;
            }
        }
        throw new RuntimeException("No such ongoing appointment");
    }

    private Specialist getWorkingSpecialistById(Integer specialistId) throws RuntimeException {
        Optional<Specialist> specialistOptional = specialistRepository.findById(specialistId);
        if (specialistOptional.isPresent()) {
            return specialistOptional.get();
        }
        throw new RuntimeException("No such specialist working");
    }
}
