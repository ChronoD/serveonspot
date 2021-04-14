package com.example.serveonspot;

import com.example.serveonspot.entities.AppUser;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.AppUserRepository;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class ServeonspotApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServeonspotApplication.class, args);
    }


    @Bean
    public CommandLineRunner demo(SpecialistRepository specialistRepository, AppUserRepository appUserRepository, BCryptPasswordEncoder encoder   ) {
        return (args) -> {

            appUserRepository.save(new AppUser(Long.valueOf(0),"0", encoder.encode("0"), "0"));
            appUserRepository.save(new AppUser(Long.valueOf(1),"10", encoder.encode("10"), "A"));
            appUserRepository.save(new AppUser(Long.valueOf(2),"25", encoder.encode("25"), "B"));
            appUserRepository.save(new AppUser(Long.valueOf(3),"45", encoder.encode("45"), "C"));

            specialistRepository.save(new Specialist(Long.valueOf(0)));
            specialistRepository.save(new Specialist(Long.valueOf(1)));
            specialistRepository.save(new Specialist(Long.valueOf(2)));
        };
    }
}
