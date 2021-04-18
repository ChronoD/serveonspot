package com.example.serveonspot.services;

import com.example.serveonspot.configuration.exceptions.AppointmentException;
import com.example.serveonspot.configuration.exceptions.SpecialistException;
import com.example.serveonspot.dtos.AppointmentStatus;
import com.example.serveonspot.dtos.CustomerPositionOutput;
import com.example.serveonspot.entities.AppUser;
import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.AppointmentRepository;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final SpecialistRepository specialistRepository;
    private final AppointmentRepository appointmentRepository;
    private final AppUserService appUserService;

    public AppointmentServiceImpl(SpecialistRepository specialistRepository, AppointmentRepository appointmentRepository, AppUserService appUserService) {
        this.specialistRepository = specialistRepository;
        this.appointmentRepository = appointmentRepository;
        this.appUserService = appUserService;
    }

    @Override
    public List<Appointment> watchOngoingAppointmentsByUser(AppUser appUser) {
        String appUserAuthority = appUser.getAuthority();
        switch (appUserAuthority) {
            case "ADMIN":
                return getOngoingAppointmentsWithStartedFirst(5);
            case "SPECIALIST":
                Integer specialistId = appUser.getSpecialist().getSpecialistId();
                return getOngoingAppointmentsBySpecialist(specialistId);
            default:
                throw new RuntimeException("No such authority");
        }
    }

    @Override
    public List<Specialist> watchWorkingSpecialists() {
        return specialistRepository.findAll();
    }

    @Override
    public CustomerPositionOutput registerAnAppointment(Integer specialistId) {
        Specialist specialist = getWorkingSpecialistById(specialistId);
        Appointment appointment = appointmentRepository.save(new Appointment(specialist));
        List<Appointment> allAppointments = getOngoingAppointmentsWithStartedFirst();

        return new CustomerPositionOutput(appointment, allAppointments);
    }

    @Override
    public CustomerPositionOutput watchAnAppointment(Integer appointmentId) {
        Appointment customersAppointment = getAppointmentById(appointmentId);
        List<Appointment> allAppointments = getOngoingAppointmentsWithStartedFirst();

        return new CustomerPositionOutput(customersAppointment, allAppointments);
    }

    @Override
    public void unregisterAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.unregister();
        appointmentRepository.save(appointment);
    }

    @Override
    @PreAuthorize("hasRole('SPECIALIST')")
    public void startAnAppointment(Integer appointmentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserService.loadAppUserByUsername(authentication.getName());
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.start();
        appointmentRepository.save(appointment);
    }

    @Override
    @PreAuthorize("hasRole('SPECIALIST')")
    public void finishAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.finish();
        appointmentRepository.save(appointment);
    }

    @Override
    @PreAuthorize("hasRole('SPECIALIST')")
    public void cancelAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.cancel();
        appointmentRepository.save(appointment);
    }

    public List<Appointment> getOngoingAppointmentsWithStartedFirst(Integer waitingLineLength) {
        return getOngoingAppointmentsWithStartedFirst();
    }

    public List<Appointment> getOngoingAppointmentsBySpecialist(Integer specialistId) {
        return getOngoingAppointmentsWithStartedFirst().stream()
                .filter(a -> a.getSpecialist().getSpecialistId() == specialistId)
                .collect(Collectors.toList());
    }

    private List<Appointment> getOngoingAppointmentsWithStartedFirst() {
        return appointmentRepository.findAll().stream()
                .filter(a -> isAppointmentOngoing(a))
                .sorted((a, b) -> (a.getStatus()).compareTo(a.getStatus()))
                .collect(Collectors.toList());
    }

    private Appointment getAppointmentById(Integer appointmentId) {
        return appointmentRepository.findById(appointmentId).orElseThrow(() -> new AppointmentException("No such appointment"));
    }

    private boolean isAppointmentOngoing(Appointment appt) {
        return (appt.getStatus().equals(AppointmentStatus.REGISTERED)
                || appt.getStatus().equals(AppointmentStatus.STARTED));
    }

    private Appointment getOngoingAppointmentById(Integer appointmentId) throws RuntimeException {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);
        if (appointmentOptional.isPresent()) {
            Appointment appointment = appointmentOptional.get();
            if (isAppointmentOngoing(appointment)) {
                return appointment;
            }
        }
        throw new AppointmentException("No such ongoing appointment");
    }

    private Specialist getWorkingSpecialistById(Integer specialistId) throws RuntimeException {
        Optional<Specialist> specialistOptional = specialistRepository.findById(specialistId);
        if (specialistOptional.isPresent()) {
            return specialistOptional.get();
        }
        throw new SpecialistException("No such specialist working");
    }
}
