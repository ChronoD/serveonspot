package com.example.serveonspot.appointment;

import com.example.serveonspot.configuration.exceptions.AppointmentStatusException;
import com.example.serveonspot.specialist.Specialist;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@NoArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentId;

    @OneToOne
    private Specialist specialist;

    private AppointmentStatus status;

    @JsonIgnore
    private LocalDateTime registeredAt;

    @JsonIgnore
    private LocalDateTime unregisteredAt;

    @JsonIgnore
    private LocalDateTime startedAt;

    @JsonIgnore
    private LocalDateTime finishedAt;

    public Appointment(Specialist specialist) {
        this.specialist = specialist;
        this.registeredAt = LocalDateTime.now();
        this.status = AppointmentStatus.REGISTERED;
    }

    public void unregister() {
        if (this.status == AppointmentStatus.REGISTERED) {
            this.unregisteredAt = LocalDateTime.now();
            this.status = AppointmentStatus.UNREGISTERED;
        } else {
            throw new AppointmentStatusException("Can only unregister the appointment before getting service");
        }
    }

    public void start() {
        if (this.status == AppointmentStatus.REGISTERED) {
            this.startedAt = LocalDateTime.now();
            this.status = AppointmentStatus.STARTED;
        } else {
            throw new AppointmentStatusException("Can only start a registered appointment");
        }
    }

    public void cancel() {
        if (this.status == AppointmentStatus.REGISTERED || this.status == AppointmentStatus.STARTED) {
            this.startedAt = null;
            this.status = AppointmentStatus.CANCELLED;
        } else {
            throw new AppointmentStatusException("Can only cancel a registered or started appointment");
        }
    }

    public void finish() {
        if (this.status == AppointmentStatus.STARTED) {
            this.finishedAt = LocalDateTime.now();
            this.status = AppointmentStatus.FINISHED;
        } else {
            throw new AppointmentStatusException("Can only finish a started appointment");
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return appointmentId == that.appointmentId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(appointmentId);
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public Specialist getSpecialist() {
        return specialist;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

}
