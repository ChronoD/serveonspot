package com.example.serveonspot;

import com.example.serveonspot.specialist.Specialist;
import com.example.serveonspot.specialist.SpecialistType;
import com.example.serveonspot.user.AppUser;
import com.example.serveonspot.user.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class ServeonspotApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServeonspotApplication.class, args);
    }


    @Bean
    public CommandLineRunner demo(AppUserRepository appUserRepository, BCryptPasswordEncoder encoder) {
        return (args) -> {
            appUserRepository.save(new AppUser("admin", encoder.encode("admin"), "ADMIN", "ADMIN", null));
            appUserRepository.save(new AppUser("1", encoder.encode("1"), "SPECIALIST", "SPECIALIST", new Specialist(SpecialistType.ONE_MINUTE)));
            appUserRepository.save(new AppUser("5", encoder.encode("5"), "SPECIALIST", "SPECIALIST", new Specialist(SpecialistType.FIVE_MINUTES)));
            appUserRepository.save(new AppUser("9", encoder.encode("9"), "SPECIALIST", "SPECIALIST", new Specialist(SpecialistType.NINE_MINUTES)));
        };
    }

}
