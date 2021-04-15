package com.example.serveonspot.repositories;

import com.example.serveonspot.entities.Appointment;
import com.example.serveonspot.entities.Specialist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
}
