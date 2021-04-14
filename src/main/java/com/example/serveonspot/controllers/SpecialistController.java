package com.example.serveonspot.controllers;

import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.services.SpecialistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping(value = "/specialists")
@CrossOrigin(allowedHeaders = "*")
public class SpecialistController {

    private final SpecialistService specialistService;

    public SpecialistController(SpecialistService specialistService
    ) {
        this.specialistService = specialistService;
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<List<Specialist>> getAllSpecialists() {
        return Flux.interval(Duration.ofSeconds(5))
                .map(call  -> specialistService.getWorkingSpecialists());
    }

    @PreAuthorize(value = "ROLE_A")
    @GetMapping(value = "/{specialistId}/customers")
    public ResponseEntity<List<Customer>> getWaitingCustomers(@PathVariable(value = "specialistId") int specialistId) {
        List<Customer> customers = specialistService.getWaitingList(specialistId);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('ROLE_A')")
    @PutMapping(value = "/{specialistId}/customers/{customerId}/start")
    public ResponseEntity<Customer> startServingCustomer(@PathVariable(value = "specialistId") int specialistId, @PathVariable(value = "customerId") int customerId) {
        Customer customer = specialistService.startServingCustomer(specialistId, customerId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('ROLE_A')")
    @PutMapping(value = "/{specialistId}/customers/{customerId}/cancel")
    public ResponseEntity<Customer> cancelServingCustomer(@PathVariable(value = "specialistId") int specialistId, @PathVariable(value = "specialistId") int customerId) {
        Customer customer = specialistService.cancelServingCustomer(specialistId, customerId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

//    @PreAuthorize("hasAnyRole('ROLE_A')")
    @PutMapping(value = "/{specialistId}/customers/{customerId}/end")
    public ResponseEntity<Customer> endServingCustomer(@PathVariable(value = "specialistId") int specialistId, @PathVariable(value = "specialistId") int customerId) {
        Customer customer = specialistService.endServingCustomer(specialistId, customerId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

}
