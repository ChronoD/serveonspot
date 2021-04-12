package com.example.serveonspot;

import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServeonspotApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServeonspotApplication.class, args);
    }


    @Bean
    public CommandLineRunner demo(SpecialistRepository specialistRepository) {
        return (args) -> {
            specialistRepository.save(new Specialist(Long.valueOf(0)));
            specialistRepository.save(new Specialist(Long.valueOf(1)));
            specialistRepository.save(new Specialist(Long.valueOf(2)));
        };
    }
}
