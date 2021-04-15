package com.example.serveonspot.controllers;

import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.services.AppointmentService;
import com.example.serveonspot.services.SpecialistService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping(value = "/specialists")
@CrossOrigin(allowedHeaders = "*")
public class SpecialistController {

    private final SpecialistService specialistService;
    private final AppointmentService appointmentService;

    public SpecialistController(SpecialistService specialistService, AppointmentService appointmentService) {
        this.specialistService = specialistService;
        this.appointmentService = appointmentService;
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<List<Specialist>> getAllSpecialists() {
        return Flux.interval(Duration.ofSeconds(5))
                .map(call  -> appointmentService.getWorkingSpecialists());
    }

}
