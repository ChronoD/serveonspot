package com.example.serveonspot.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
public class Customer {

    @Id
    private int customerId;

    private LocalDateTime registered;

    private LocalDateTime unregistered;

    private boolean awaiting;

    private LocalDateTime startedVisit;

    private boolean started;

    private LocalDateTime endedVisit;

    private boolean finished;

    @OneToOne
    private Specialist specialist;

    public Customer(int customerNumber) {
        this.customerId = customerNumber + 1;
        this.registered = LocalDateTime.now();
        this.awaiting = true;
    }

    public void unregister() {
        if (!this.started) {
            this.unregistered = LocalDateTime.now();
            this.awaiting = false;
        }
    }

    public void startServing() {
        if (this.awaiting) {
            this.startedVisit = LocalDateTime.now();
            this.started = true;
        }
    }

    public void cancelServing() {
        if (this.awaiting && !this.finished) {
            this.startedVisit = null;
            this.started = false;
        }
    }

    public void endServing(Specialist specialist) {
        if (this.started) {
            this.endedVisit = LocalDateTime.now();
            this.awaiting = false;
            this.started = false;
            this.specialist=specialist;
        }
    }

    @Override
    public String toString() {
        return String.format("%03d", customerId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return customerId == customer.customerId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId);
    }
}
