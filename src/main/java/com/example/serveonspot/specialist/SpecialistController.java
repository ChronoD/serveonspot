package com.example.serveonspot.specialist;

import com.example.serveonspot.appointment.AppointmentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping(value = "/api/specialists")
@CrossOrigin(allowedHeaders = "*")
public class SpecialistController {

    private final AppointmentService appointmentService;

    public SpecialistController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<List<SpecialistInfoOutput>> watchSpecialists() {
        return Flux.interval(Duration.ofSeconds(2))
                .map(call -> appointmentService.getSpecialists());
    }
}
