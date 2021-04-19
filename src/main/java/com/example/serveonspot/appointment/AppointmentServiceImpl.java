package com.example.serveonspot.appointment;

import com.example.serveonspot.configuration.exceptions.AppointmentException;
import com.example.serveonspot.configuration.exceptions.SpecialistException;
import com.example.serveonspot.specialist.Specialist;
import com.example.serveonspot.specialist.SpecialistInfoOutput;
import com.example.serveonspot.specialist.SpecialistRepository;
import com.example.serveonspot.user.AppUser;
import com.example.serveonspot.user.AppUserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
    public List<AppointmentInfoOutput> getOngoingAppointmentsByUserRole(AppUser appUser) {

        String appUserAuthority = appUser.getAuthority();
        switch (appUserAuthority) {
            case "ADMIN":
                return getOngoingAppointmentsWithStartedFirstAndFiveWaiting(5);
            case "SPECIALIST":
                Integer specialistId = appUser.getSpecialist().getSpecialistId();
                return getOngoingAppointmentsBySpecialist(specialistId);
            default:
                throw new RuntimeException("No such authority");
        }
    }

    @Override
    public List<SpecialistInfoOutput> getSpecialists() {
        return specialistRepository.findAll().stream()
                .map(s -> new SpecialistInfoOutput(s))
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentInfoOutput registerAnAppointment(Integer specialistId) {
        Specialist specialist = getWorkingSpecialistById(specialistId);
        Appointment appointment = appointmentRepository.save(new Appointment(specialist));
        List<Appointment> allAppointments = getOngoingAppointmentsWithStartedFirstOfSpecialist(specialistId);

        return new AppointmentInfoOutput(appointment, allAppointments);
    }

    @Override
    public AppointmentInfoOutput getAnAppointment(Integer appointmentId) {
        Appointment customersAppointment = getAppointmentById(appointmentId);
        List<Appointment> allAppointments = getOngoingAppointmentsWithStartedFirstOfSpecialist(customersAppointment.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(customersAppointment, allAppointments);
    }

    @Override
    public AppointmentInfoOutput unregisterAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.unregister();
        Appointment updated = appointmentRepository.save(appointment);
        List<Appointment> allAppointments = getOngoingAppointmentsWithStartedFirstOfSpecialist(updated.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(updated, allAppointments);
    }

    @Override
    @PreAuthorize("hasRole('SPECIALIST')")
    public AppointmentInfoOutput startAnAppointment(Integer appointmentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserService.loadAppUserByUsername(authentication.getName());
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.start();
        Appointment updated = appointmentRepository.save(appointment);
        List<Appointment> allAppointments = getOngoingAppointmentsWithStartedFirstOfSpecialist(updated.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(updated, allAppointments);
    }

    @Override
    @PreAuthorize("hasRole('SPECIALIST')")
    public AppointmentInfoOutput finishAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.finish();
        Appointment updated = appointmentRepository.save(appointment);
        List<Appointment> allAppointments = getOngoingAppointmentsWithStartedFirstOfSpecialist(updated.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(updated, allAppointments);
    }

    @Override
    @PreAuthorize("hasRole('SPECIALIST')")
    public AppointmentInfoOutput cancelAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.cancel();
        Appointment updated = appointmentRepository.save(appointment);
        List<Appointment> allAppointments = getOngoingAppointmentsWithStartedFirstOfSpecialist(updated.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(updated, allAppointments);
    }

    public List<Appointment> getOngoingAppointmentsWithStartedFirst(Integer waitingLineLength) {
        return getOngoingAppointmentsWithStartedFirst();
    }

    public List<AppointmentInfoOutput> getOngoingAppointmentsBySpecialist(Integer specialistId) {
        List<Appointment> appointmentList = getOngoingAppointmentsWithStartedFirst();

        return appointmentList.stream()
                .filter(a -> a.getSpecialist().getSpecialistId() == specialistId)
                .map(a -> new AppointmentInfoOutput(a, appointmentList))
                .collect(Collectors.toList());
    }

    private List<AppointmentInfoOutput> getOngoingAppointmentsWithStartedFirstAndFiveWaiting(int waitingLineLength) {

        List<Appointment> allStarted = appointmentRepository.findAll().stream()
                .filter(a -> isAppointmentStarted(a))
                .collect(Collectors.toList());

        List<Appointment> registeredByLimit = appointmentRepository.findAll().stream()
                .filter(a -> isAppointmentRegistered(a))
                .limit(waitingLineLength)
                .collect(Collectors.toList());

        List<Appointment> allAppointments = Stream.concat(allStarted.stream(), registeredByLimit.stream()).collect(Collectors.toList());
        return allAppointments.stream()
                .map(a -> new AppointmentInfoOutput(a, allAppointments))
                .collect(Collectors.toList());
    }

    private List<Appointment> getOngoingAppointmentsWithStartedFirstOfSpecialist(Integer specialistId) {
        return appointmentRepository.findAll().stream()
                .filter(a -> (a.getSpecialist().getSpecialistId() == specialistId) && isAppointmentOngoing(a))
                .sorted((a, b) -> (a.getStatus()).compareTo(a.getStatus()))
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

    private boolean isAppointmentRegistered(Appointment appt) {
        return (appt.getStatus().equals(AppointmentStatus.REGISTERED));
    }

    private boolean isAppointmentStarted(Appointment appt) {
        return (appt.getStatus().equals(AppointmentStatus.STARTED));
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
