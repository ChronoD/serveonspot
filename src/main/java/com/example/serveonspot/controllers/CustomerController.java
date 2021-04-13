package com.example.serveonspot.controllers;

import com.example.serveonspot.entities.CustomerPosition;
import com.example.serveonspot.services.PrivateWaitingList;
import com.example.serveonspot.services.PublicWaitingList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/customers")
public class CustomerController {

    private final PublicWaitingList publicWaitingList;

    public CustomerController(PublicWaitingList publicWaitingList, PrivateWaitingList privateWaitingList
    ) {
        this.publicWaitingList = publicWaitingList;
    }

    @PreAuthorize("hasAnyRole('ROLE_0')")
    @GetMapping
    public Flux<ServerSentEvent<String>> getAllWaitingCustomers(@RequestParam(required = false) Integer lineLength) {
        return Flux.interval(Duration.ofSeconds(5))
                .map(sequence -> ServerSentEvent.<String>builder()
                        .id(String.valueOf(sequence))
                        .event("periodic-event")
                        .data("Total customers in line: - " + publicWaitingList.getCustomersInLine(lineLength).stream()
                                .map(c -> String.format("%03d", Integer.valueOf(c.toString()))).collect(Collectors.joining("; id: ")))
                        .build());
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
