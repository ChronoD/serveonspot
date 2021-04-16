package com.example.serveonspot;

import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ServeonspotApplication  {

    public static void main(String[] args) {
        SpringApplication.run(ServeonspotApplication.class, args);
    }


    @Bean
    public CommandLineRunner demo(SpecialistRepository specialistRepository   ) {
        return (args) -> {
            specialistRepository.save(new Specialist("1"));
            specialistRepository.save(new Specialist("5"));
            specialistRepository.save(new Specialist("9"));
        };
    }
}
