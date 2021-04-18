package com.example.serveonspot;

import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.repositories.AppointmentRepository;
import com.example.serveonspot.services.AppointmentService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
class AppointmentServiceTests {

	@InjectMocks
	private AppointmentService appointmentService;
	@Mock
	private AppointmentRepository appointmentRepository;

	private List<Appointment> appointmentList= Arrays.asList(new Appointment(),new Appointment());
//
//	@Test
//	void getsOngoingAppointments() {
//		Mockito.when(appointmentRepository.findAll()).thenReturn();
//	}

}
