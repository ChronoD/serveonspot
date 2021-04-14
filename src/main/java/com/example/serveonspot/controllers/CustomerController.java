package com.example.serveonspot.controllers;

import com.example.serveonspot.entities.Customer;
import com.example.serveonspot.entities.CustomerPosition;
import com.example.serveonspot.services.PrivateWaitingList;
import com.example.serveonspot.services.PublicWaitingList;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*")
@RequestMapping(value = "/customers")
public class CustomerController {

    private final PublicWaitingList publicWaitingList;

    public CustomerController(PublicWaitingList publicWaitingList, PrivateWaitingList privateWaitingList
    ) {
        this.publicWaitingList = publicWaitingList;
    }

    //    @PreAuthorize("hasAnyRole('ROLE_Z')")
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<Customer>> getAllWaitingCustomers(@RequestParam(required = false) Integer lineLength) {
        return Flux.interval(Duration.ofSeconds(5))
                .map(sequence -> publicWaitingList.getCustomersInLine(lineLength));
    }

    @PostMapping
    public CustomerPosition reserveVisit() {
        return publicWaitingList.registerToTheWaitingList();
    }

    @GetMapping(value = "/{customerId}")
    public CustomerPosition getPositionOnTheWaitingList(@PathVariable(value = "customerId") int customerId) {
        return publicWaitingList.getPositionOnTheWaitingList(customerId);
    }

    @DeleteMapping(value = "/{customerId}")
    public ResponseEntity cancelVisit(@PathVariable(value = "customerId") int customerId) {
        publicWaitingList.unregisterFromTheWaitingList(customerId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
