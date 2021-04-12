package com.example.serveonspot.repositories;

import com.example.serveonspot.entities.Specialist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecialistRepository extends JpaRepository<Specialist, Long> {
    List<Specialist> findByIsWorkingTrue();

}
