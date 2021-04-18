package com.example.serveonspot;

import com.example.serveonspot.appointment.Appointment;
import com.example.serveonspot.appointment.AppointmentRepository;
import com.example.serveonspot.appointment.AppointmentService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
class AppointmentServiceTests {

    @InjectMocks
    private AppointmentService appointmentService;
    @Mock
    private AppointmentRepository appointmentRepository;

    private final List<Appointment> appointmentList = Arrays.asList(new Appointment(), new Appointment());
//
//	@Test
//	void getsOngoingAppointments() {
//		Mockito.when(appointmentRepository.findAll()).thenReturn();
//	}

}
