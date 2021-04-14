package com.example.serveonspot;

import com.example.serveonspot.entities.AppUser;
import com.example.serveonspot.entities.Specialist;
import com.example.serveonspot.repositories.AppUserRepository;
import com.example.serveonspot.repositories.SpecialistRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class ServeonspotApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(ServeonspotApplication.class, args);
    }


    @Bean
    public CommandLineRunner demo(SpecialistRepository specialistRepository, AppUserRepository appUserRepository, BCryptPasswordEncoder encoder   ) {
        return (args) -> {

            appUserRepository.save(new AppUser(Long.valueOf(0),"z", encoder.encode("z"), "Z"));
            appUserRepository.save(new AppUser(Long.valueOf(1),"1", encoder.encode("1"), "A"));
            appUserRepository.save(new AppUser(Long.valueOf(2),"5", encoder.encode("5"), "A"));
            appUserRepository.save(new AppUser(Long.valueOf(3),"9", encoder.encode("9"), "A"));
        };
    }
}
