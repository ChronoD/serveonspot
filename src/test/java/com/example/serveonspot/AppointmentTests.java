package com.example.serveonspot;

import com.example.serveonspot.configuration.exceptions.AppointmentStatusException;
import com.example.serveonspot.appointment.AppointmentStatus;
import com.example.serveonspot.appointment.Appointment;
import com.example.serveonspot.specialist.Specialist;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class AppointmentTests {

    @Test
    void createsAnAppoinment() {
        Specialist specialist1 = new Specialist();
        Appointment appointment1 = new Appointment(specialist1);

        appointment1.getSpecialist().equals(specialist1);
        appointment1.getStatus().equals(AppointmentStatus.REGISTERED);
    }

    @Test
    void unregistersAnAppoinment() {
        Appointment appointment1 = new Appointment(new Specialist());

        appointment1.unregister();

        assertEquals(appointment1.getStatus(), AppointmentStatus.UNREGISTERED);
    }

    @Test
    void startsAnAppoinment() {
        Appointment appointment1 = new Appointment(new Specialist());

        appointment1.start();

        assertEquals(appointment1.getStatus(), AppointmentStatus.STARTED);
    }

    @Test
    void finishesAnAppoinment() {
        Appointment appointment1 = new Appointment(new Specialist());
        appointment1.start();

        appointment1.finish();

        assertEquals(appointment1.getStatus(), AppointmentStatus.FINISHED);
    }

    @Test
    void cancelsAnAppoinment() {
        Appointment appointment1 = new Appointment(new Specialist());

        appointment1.cancel();

        assertEquals(appointment1.getStatus(), AppointmentStatus.CANCELLED);
    }

    @Test
    void registeredthrowsWhenStatusesAreSkipped() {
        Appointment registeredAppointment = new Appointment(new Specialist());

        assertThrows(AppointmentStatusException.class, () -> {
            registeredAppointment.finish();
        });
    }

    @Test
    void unregisteredThrowsWhenStatusesAreSkipped() {
        Appointment unregisteredAppointment = new Appointment(new Specialist());
        unregisteredAppointment.unregister();

        assertThrows(AppointmentStatusException.class, () -> {
            unregisteredAppointment.unregister();
        });
        assertThrows(AppointmentStatusException.class, () -> {
            unregisteredAppointment.start();
        });
        assertThrows(AppointmentStatusException.class, () -> {
            unregisteredAppointment.finish();
        });
        assertThrows(AppointmentStatusException.class, () -> {
            unregisteredAppointment.cancel();
        });
    }

    @Test
    void startedThrowsWhenStatusesAreSkipped() {
        Appointment startedAppointment = new Appointment(new Specialist());
        startedAppointment.start();

        assertThrows(AppointmentStatusException.class, () -> {
            startedAppointment.unregister();
        });
    }


    @Test
    void finishedThrowsWhenStatusesAreSkipped() {
        Appointment finishedAppointment = new Appointment(new Specialist());
        finishedAppointment.start();
        finishedAppointment.finish();

        assertThrows(AppointmentStatusException.class, () -> {
            finishedAppointment.unregister();
        });

        assertThrows(AppointmentStatusException.class, () -> {
            finishedAppointment.start();
        });

        assertThrows(AppointmentStatusException.class, () -> {
            finishedAppointment.cancel();
        });
    }


    @Test
    void cancelledThrowsWhenStatusesAreSkipped() {
        Appointment cancelledAppointment = new Appointment(new Specialist());
        cancelledAppointment.cancel();

        assertThrows(AppointmentStatusException.class, () -> {
            cancelledAppointment.unregister();
        });
        assertThrows(AppointmentStatusException.class, () -> {
            cancelledAppointment.start();
        });
        assertThrows(AppointmentStatusException.class, () -> {
            cancelledAppointment.finish();
        });
    }

}
