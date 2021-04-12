package com.example.serveonspot.controllers;

import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.services.SpecialistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/specialists")
public class SpecialistController {

    private final SpecialistService specialistService;

    public SpecialistController(SpecialistService specialistService
    ) {
        this.specialistService = specialistService;
    }

//    @PostMapping(value = "/login")
//    public ResponseEntity<Specialist> logIn(@PathVariable(value = "specialistId") int specialistId, @RequestParam String password) {
//        Specialist specialist = specialistService.logIn(specialistId);
//        return new ResponseEntity<>(specialist, HttpStatus.OK);
//    }
//
//    //@Authorized
//    @PostMapping(value = "/logout")
//    public ResponseEntity logOut(@PathVariable(value = "specialistId") int specialistId, @RequestParam String password) {
//        specialistService.logOut(specialistId);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    //@Authorized
    @GetMapping
    public ResponseEntity<String> getAllSpecialists() {
        List<Specialist> specialists = specialistService.getWorkingSpecialists();
        return new ResponseEntity<>(specialists.stream().map(s->String.valueOf(s.getSpecialistId())).collect(Collectors.joining(", ")), HttpStatus.OK);
    }


    //@Authorized
    @GetMapping(value = "/{specialistId}/customers")
    public ResponseEntity<List<Customer>> getWaitingCustomers(@PathVariable(value = "specialistId") int specialistId) {
        List<Customer> customers = specialistService.getWaitingList(specialistId);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    //@Authorized
    @PutMapping(value = "/{specialistId}/customers/{customerId}/start")
    public ResponseEntity<Customer> startServingCustomer(@PathVariable(value = "specialistId") int specialistId, @PathVariable(value = "customerId") int customerId) {
        Customer customer = specialistService.startServingCustomer(specialistId, customerId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    //@Authorized
    @PutMapping(value = "/{specialistId}/customers/{customerId}/cancel")
    public ResponseEntity<Customer> cancelServingCustomer(@PathVariable(value = "specialistId") int specialistId, @PathVariable(value = "specialistId") int customerId) {
        Customer customer = specialistService.cancelServingCustomer(specialistId, customerId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    //@Authorized
    @PutMapping(value = "/{specialistId}/customers/{customerId}/end")
    public ResponseEntity<Customer> endServingCustomer(@PathVariable(value = "specialistId") int specialistId, @PathVariable(value = "specialistId") int customerId) {
        Customer customer = specialistService.endServingCustomer(specialistId, customerId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
}
