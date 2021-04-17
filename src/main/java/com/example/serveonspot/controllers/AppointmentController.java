package com.example.serveonspot.controllers;

import com.example.serveonspot.dtos.AppointmentBookingInput;
import com.example.serveonspot.dtos.AppointmentStatusInput;
import com.example.serveonspot.dtos.CustomerPositionOutput;
import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.services.AppUserService;
import com.example.serveonspot.services.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
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

    public AppointmentController(AppointmentService appointmentService,AppUserService appUserService) {
        this.appointmentService = appointmentService;
        this.appUserService=appUserService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SPECIALIST')")
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<Appointment>> trackOngoingAppointments(@RequestParam(required = false) Integer lineLength) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<String> authority = authentication.getAuthorities().stream().findFirst().map(GrantedAuthority::toString);
        if (authority.isPresent()) {
            switch (authority.get()) {
                case "ADMIN":
                    return Flux.interval(Duration.ofSeconds(5))
                            .map(sequence -> appointmentService.getOngoingAppointments(lineLength));
                case "SPECIALIST":
                    Specialist specialist = appUserService.loadSpecialistByUsername(authentication.getName());
                    return Flux.interval(Duration.ofSeconds(5))
                            .map(sequence -> appointmentService.getOngoingAppointmentsBySpecialist(specialist.getSpecialistId()));
            }
        }
        throw new RuntimeException("No such authority");
    }

    @PostMapping
    public CustomerPositionOutput registerAppointment(@RequestBody @Valid AppointmentBookingInput booking) {
        return appointmentService.registerAnAppointment(booking.getSpecialistId());
    }

    @GetMapping(value = "/{appoitmentId}")
    public Flux<CustomerPositionOutput> trackAppointment(@PathVariable(value = "appoitmentId") Integer appointmentId) {

        return Flux.interval(Duration.ofSeconds(1))
                .map(sequence -> appointmentService.trackAnAppointment(appointmentId));
    }


    @PatchMapping(value = "/{appointmentId}")
    public ResponseEntity<Appointment> startServingCustomer(@PathVariable(value = "appointmentId") int appointmentId, @RequestBody @Valid AppointmentStatusInput status) {
        String updateOperation = status.getStatus();

        switch (updateOperation) {
            case "unregister":
                appointmentService.unregisterAnAppointment(appointmentId);
                break;

            case "start":
                appointmentService.startAnAppointment(appointmentId);
                break;

            case "finish":
                appointmentService.finishAnAppointment(appointmentId);
                break;

            case "cancel":
                appointmentService.cancelAnAppointment(appointmentId);
                break;

            default:
                throw new RuntimeException("No such operation allowed");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
