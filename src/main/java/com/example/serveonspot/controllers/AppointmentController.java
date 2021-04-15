package com.example.serveonspot.controllers;

import com.example.serveonspot.dtos.AppointmentBooking;
import com.example.serveonspot.dtos.AppointmentStatus;
import com.example.serveonspot.dtos.CustomerPosition;
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
    public CustomerPosition registerAppointment(@RequestBody @Valid AppointmentBooking booking) {
        return appointmentService.registerAnAppointment(booking.getSpecialistId());
    }

    //    @GetMapping(value = "/{customerId}")
//    public CustomerPosition getPositionOnTheWaitingList(@PathVariable(value = "appoitmentId") Integer appointmentId) {
//        return appointmentService.getPositionOnTheWaitingList(appointmentId);
//    }

    @DeleteMapping(value = "/{appoitmentId}")
    public ResponseEntity unregisterAppointment(@PathVariable(value = "appoitmentId") Integer appointmentId) {
        appointmentService.unregisterAnAppointment(appointmentId);
        return new ResponseEntity(HttpStatus.OK);
    }


    //    @PreAuthorize("hasAnyRole('ROLE_A')")
    @PatchMapping(value = "/{appointmentId}")
    public ResponseEntity<Appointment> startServingCustomer(@PathVariable(value = "appointmentId") int appointmentId, @RequestBody @Valid AppointmentStatus status) {
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


    //    @PreAuthorize("hasAnyRole('ROLE_Z')")
//    @GetMapping(value="{lineLength}",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public Flux<List<Customer>> getAllWaitingCustomers(@RequestParam(required = false) Integer lineLength) {
//        return Flux.interval(Duration.ofSeconds(5))
//                .map(sequence -> publicWaitingList.getCustomersInLine(lineLength));
//    }

    //    @GetMapping(value = "/{customerId}")
//    public CustomerPosition getPositionOnTheWaitingList(@PathVariable(value = "customerId") int customerId) {
//        return publicWaitingList.getPositionOnTheWaitingList(customerId);
//    }


//    @PreAuthorize(value = "ROLE_A")
//    @GetMapping(value = "/{specialistId}")
//    public ResponseEntity<List<Customer>> getWaitingCustomers(@PathVariable(value = "specialistId") int specialistId) {
//        List<Customer> customers = specialistService.getWaitingList(specialistId);
//        return new ResponseEntity<>(customers, HttpStatus.OK);
//    }
//
//

//
//    //    @PreAuthorize("hasAnyRole('ROLE_A')")
//    @PutMapping(value = "/{specialistId}/customers/{customerId}/cancel")
//    public ResponseEntity<Customer> cancelServingCustomer(@PathVariable(value = "specialistId") int specialistId, @PathVariable(value = "specialistId") int customerId) {
//        Customer customer = specialistService.cancelServingCustomer(specialistId, customerId);
//        return new ResponseEntity<>(customer, HttpStatus.OK);
//    }
//
//    //    @PreAuthorize("hasAnyRole('ROLE_A')")
//    @PutMapping(value = "/{customerId}/specialist/{specialistId}")
//    public ResponseEntity<Customer> endServingCustomer(@PathVariable(value = "specialistId") int specialistId, @PathVariable(value = "specialistId") int customerId) {
//        Customer customer = specialistService.endServingCustomer(specialistId, customerId);
//        return new ResponseEntity<>(customer, HttpStatus.OK);
//    }
}
