package com.example.serveonspot.entities;

import com.example.serveonspot.configuration.exceptions.AppointmentStatusException;
import com.example.serveonspot.dtos.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    public String toString() {
        return String.format("%03d", this.appointmentId);
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
