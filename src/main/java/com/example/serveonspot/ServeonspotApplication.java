package com.example.serveonspot;

import com.example.serveonspot.entities.AppUser;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.AppUserRepository;
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
    public CommandLineRunner demo(AppUserRepository appUserRepository, BCryptPasswordEncoder encoder) {
        return (args) -> {
            appUserRepository.save(new AppUser("admin", encoder.encode("admin"), "ADMIN","ADMIN", null));
            appUserRepository.save(new AppUser("1", encoder.encode("1"), "SPECIALIST","SPECIALIST",new Specialist("1")));
            appUserRepository.save(new AppUser("5", encoder.encode("5"), "SPECIALIST","SPECIALIST",new Specialist("5")));
            appUserRepository.save(new AppUser("9", encoder.encode("9"), "SPECIALIST","SPECIALIST",new Specialist("9")));
        };
    }
}
