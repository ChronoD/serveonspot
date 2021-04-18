package com.example.serveonspot.appointment;

import com.example.serveonspot.configuration.exceptions.AppointmentStatusException;
import com.example.serveonspot.user.AppUser;
import com.example.serveonspot.user.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import javax.validation.Valid;
import java.time.Duration;
import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*")
@RequestMapping(value = "/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppUserService appUserService;

    public AppointmentController(AppointmentService appointmentService, AppUserService appUserService) {
        this.appointmentService = appointmentService;
        this.appUserService = appUserService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SPECIALIST')")
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<Appointment>> trackOngoingAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser appUser = appUserService.loadAppUserByUsername(authentication.getName());
        return Flux.interval(Duration.ofSeconds(5))
                .map(sequence -> appointmentService.getOngoingAppointmentsByUserRole(appUser));
    }

    @PostMapping
    public AppointmentInfoOutput registerAppointment(@RequestBody @Valid AppointmentRegistrationInput booking) {
        return appointmentService.registerAnAppointment(booking.getSpecialistId());
    }

    @GetMapping(value = "/{appointmentId}")
    public Flux<AppointmentInfoOutput> watchAppointment(@PathVariable(value = "appointmentId") Integer appointmentId) {

        return Flux.interval(Duration.ofSeconds(2))
                .map(sequence -> appointmentService.getAnAppointment(appointmentId));
    }


    @PatchMapping(value = "/{appointmentId}")
    public ResponseEntity<Appointment> startServingCustomer(@PathVariable(value = "appointmentId") int appointmentId, @RequestBody @Valid AppointmentStatusInput status) {
        AppointmentStatus updateOperation = status.getStatus();

        switch (updateOperation) {
            case UNREGISTERED:
                appointmentService.unregisterAnAppointment(appointmentId);
                break;

            case STARTED:
                appointmentService.startAnAppointment(appointmentId);
                break;

            case FINISHED:
                appointmentService.finishAnAppointment(appointmentId);
                break;

            case CANCELLED:
                appointmentService.cancelAnAppointment(appointmentId);
                break;

            default:
                throw new AppointmentStatusException("No such status allowed");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
