package com.example.serveonspot.controllers;

import com.example.serveonspot.dtos.AppointmentBookingInput;
import com.example.serveonspot.dtos.AppointmentStatusInput;
import com.example.serveonspot.dtos.CustomerPositionOutput;
import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.services.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    //    @PreAuthorize("hasAnyRole('ROLE_Z')")
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<Appointment>> trackOngoingAppointments(@RequestParam(required = false) Integer lineLength) {
        return Flux.interval(Duration.ofSeconds(5))
                .map(sequence -> appointmentService.getOngoingAppointments(lineLength));
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

    @DeleteMapping(value = "/{appoitmentId}")
    public ResponseEntity unregisterAppointment(@PathVariable(value = "appoitmentId") Integer appointmentId) {
        appointmentService.unregisterAnAppointment(appointmentId);
        return new ResponseEntity(HttpStatus.OK);
    }


    //    @PreAuthorize("hasAnyRole('ROLE_A')")
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
