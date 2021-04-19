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
import java.util.Optional;

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
    public Flux<List<AppointmentInfoOutput>> trackOngoingAppointments() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<AppUser> userOptional = appUserService.loadAppUserByUsername(authentication.getName());

        if (!userOptional.isPresent()) {
            throw new RuntimeException("Not authorized");
        }
        AppUser user = userOptional.get();
        String appUserAuthority = user.getAuthority();
        switch (appUserAuthority) {
            case "ADMIN":
                return Flux.interval(Duration.ofSeconds(5))
                        .map(sequence -> appointmentService.getOngoingAppointmentsByAdminRole());
            case "SPECIALIST":
                return Flux.interval(Duration.ofSeconds(5))
                        .map(sequence -> appointmentService.getOngoingAppointmentsBySpecialist(user.getSpecialist()));
            default:
                throw new RuntimeException("Not authorized");
        }
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
    public ResponseEntity<AppointmentInfoOutput> startServingCustomer(@PathVariable(value = "appointmentId") int appointmentId, @RequestBody @Valid AppointmentStatusInput status) {

        AppointmentStatus updateOperation = status.getStatus();
        AppointmentInfoOutput appointmentInfo = null;
        switch (updateOperation) {
            case UNREGISTERED:
                appointmentInfo = appointmentService.unregisterAnAppointment(appointmentId);
                break;

            case STARTED:
                authorizeSpecialistRole();
                appointmentInfo = appointmentService.startAnAppointment(appointmentId);
                break;

            case FINISHED:
                authorizeSpecialistRole();
                appointmentInfo = appointmentService.finishAnAppointment(appointmentId);
                break;

            case CANCELLED:
                authorizeSpecialistRole();
                appointmentInfo = appointmentService.cancelAnAppointment(appointmentId);
                break;

            default:
                throw new AppointmentStatusException("No such status allowed");
        }
        return new ResponseEntity<>(appointmentInfo, HttpStatus.OK);
    }

    private void authorizeSpecialistRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<AppUser> appUserOptional = appUserService.loadAppUserByUsername(authentication.getName());
        if (appUserOptional.isPresent()) {
            AppUser user = appUserOptional.get();
            if (!user.getAuthority().equals("SPECIALIST")) {
                throw new RuntimeException("Not authorized");
            }
        } else {
            throw new RuntimeException("Not authorized");
        }
    }

}
