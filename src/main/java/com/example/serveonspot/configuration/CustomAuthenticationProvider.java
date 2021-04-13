package com.example.serveonspot.configuration;

import com.example.serveonspot.entities.AppUser;
import com.example.serveonspot.services.SpecialistService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    private final UserDetailsService userDetailsService;
    private final SpecialistService specialistService;

    public CustomAuthenticationProvider(UserDetailsService userDetailsService, SpecialistService specialistService) {
        this.userDetailsService = userDetailsService;
        this.specialistService = specialistService;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        UserDetails userDetails = userDetailsService.loadUserByUsername(name);
        boolean passwordMatches = passwordEncoder().matches(password, userDetails.getPassword());

        specialistService.logIn( Integer.valueOf(userDetails.getUsername()));

        return new UsernamePasswordAuthenticationToken(
                name, password, new ArrayList<>());

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}