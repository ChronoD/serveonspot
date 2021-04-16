package com.example.serveonspot.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int appointmentId;

    private LocalDateTime registeredAt;

    private LocalDateTime unregisteredAt;

    private boolean unregistered;

    private LocalDateTime startedAt;

    private boolean started;

    private LocalDateTime finishedAt;

    private boolean finished;

    @OneToOne
    private Specialist specialist;

    public Appointment(Specialist specialist) {
        this.specialist = specialist;
        this.registeredAt = LocalDateTime.now();
    }

    public void unregister() {
        if (!this.started) {
            this.unregisteredAt = LocalDateTime.now();
            this.unregistered = true;
        }
    }

    public void start() {
        if (this.unregistered) {
            this.startedAt = LocalDateTime.now();
            this.started = true;
        }
    }

    public void cancel() {
        if (this.unregistered && this.finished) {
            this.startedAt = null;
            this.started = false;
        }
    }

    public void finish() {
        if (this.started) {
            this.finishedAt = LocalDateTime.now();
            this.unregistered = false;
            this.started = false;
        }
    }

    @Override
    public String toString() {
        return String.format("%03d", this.appointmentId);
    }

}
