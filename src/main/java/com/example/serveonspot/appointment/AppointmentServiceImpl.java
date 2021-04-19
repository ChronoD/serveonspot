package com.example.serveonspot.appointment;

import com.example.serveonspot.configuration.exceptions.AppointmentException;
import com.example.serveonspot.configuration.exceptions.SpecialistException;
import com.example.serveonspot.specialist.Specialist;
import com.example.serveonspot.specialist.SpecialistInfoOutput;
import com.example.serveonspot.specialist.SpecialistRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final SpecialistRepository specialistRepository;
    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(SpecialistRepository specialistRepository, AppointmentRepository appointmentRepository) {
        this.specialistRepository = specialistRepository;
        this.appointmentRepository = appointmentRepository;
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
        List<Appointment> allAppointments = getOngoingAppointmentsBySpecialist(specialistId);

        return new AppointmentInfoOutput(appointment, allAppointments);
    }

    @Override
    public AppointmentInfoOutput unregisterAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.unregister();
        Appointment updated = appointmentRepository.save(appointment);
        List<Appointment> allAppointments = getOngoingAppointmentsBySpecialist(updated.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(updated, allAppointments);
    }

    @Override
    public AppointmentInfoOutput getAnAppointment(Integer appointmentId) {
        Appointment customersAppointment = getAppointmentById(appointmentId);
        List<Appointment> allAppointments = getOngoingAppointmentsBySpecialist(customersAppointment.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(customersAppointment, allAppointments);
    }

    @Override
    public List<AppointmentInfoOutput> getOngoingAppointmentsBySpecialist(Specialist specialist) {
        List<Appointment> onlyOngoing = getOngoingAppointmentsBySpecialist(specialist.getSpecialistId());
        return mapToAppointmentInfo(onlyOngoing);
    }

    @Override
    public AppointmentInfoOutput startAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.start();
        Appointment updated = appointmentRepository.save(appointment);
        List<Appointment> allAppointments = getOngoingAppointmentsBySpecialist(updated.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(updated, allAppointments);
    }

    @Override
    public AppointmentInfoOutput finishAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.finish();
        Appointment updated = appointmentRepository.save(appointment);
        List<Appointment> allAppointments = getOngoingAppointmentsBySpecialist(updated.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(updated, allAppointments);
    }

    @Override
    public AppointmentInfoOutput cancelAnAppointment(Integer appointmentId) {
        Appointment appointment = getOngoingAppointmentById(appointmentId);
        appointment.cancel();
        Appointment updated = appointmentRepository.save(appointment);
        List<Appointment> allAppointments = getOngoingAppointmentsBySpecialist(updated.getSpecialist().getSpecialistId());

        return new AppointmentInfoOutput(updated, allAppointments);
    }

    @Override
    public List<AppointmentInfoOutput> getOngoingAppointmentsByAdminRole() {
        List<Appointment> allStarted = appointmentRepository.findAll().stream()
                .filter(a -> isAppointmentStarted(a))
                .collect(Collectors.toList());

        List<Appointment> registeredByLimit = appointmentRepository.findAll().stream()
                .filter(a -> isAppointmentRegistered(a))
                .limit(5)
                .collect(Collectors.toList());

        List<Appointment> allAppointments = Stream.concat(allStarted.stream(), registeredByLimit.stream()).collect(Collectors.toList());
        return mapToAppointmentInfo(allAppointments);
    }


    private List<Appointment> getOngoingAppointmentsBySpecialist(Integer specialistId) {
        List<Appointment> specialistsAppointments = specialistsAppointments(specialistId);
        return onlyOngoingAppointments(specialistsAppointments);
    }

    private List<Appointment> specialistsAppointments(Integer specialistId) {
        return appointmentRepository.findAll().stream()
                .filter(a -> a.getSpecialist().getSpecialistId() == specialistId)
                .collect(Collectors.toList());
    }

    private List<Appointment> onlyOngoingAppointments(List<Appointment> appointments) {
        return appointments.stream()
                .filter(a -> isAppointmentOngoing(a))
                .collect(Collectors.toList());
    }

    private List<AppointmentInfoOutput> mapToAppointmentInfo(List<Appointment> appointments) {
        return appointments.stream()
                .map(a -> new AppointmentInfoOutput(a, appointments))
                .collect(Collectors.toList());
    }

    private Appointment getAppointmentById(Integer appointmentId) {
        return appointmentRepository.findById(appointmentId).orElseThrow(() -> new AppointmentException("No such appointment"));
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
}
