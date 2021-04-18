package com.example.serveonspot.controllers;

import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.services.AppointmentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping(value = "/specialists")
@CrossOrigin(allowedHeaders = "*")
public class SpecialistController {

    private final AppointmentService appointmentService;

    public SpecialistController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<List<Specialist>> getAllSpecialists() {
        return Flux.interval(Duration.ofSeconds(2))
                .map(call  -> appointmentService.watchWorkingSpecialists());
    }
}
