package com.example.serveonspot.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;

public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private  UserDetailsService userDetailsService;

    @Autowired
    private  BCryptPasswordEncoder encoder;
//
//    public CustomAuthenticationProvider(UserDetailsService userDetailsService) {
//        this.userDetailsService = userDetailsService;
//
//    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        if (!StringUtils.isEmpty(name) && !StringUtils.isEmpty(password)) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(name);
            if (encoder.matches(password, userDetails.getPassword())) {
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails,
                        userDetails.getPassword(), userDetails.getAuthorities());
                token.setDetails(userDetails);
                return token;
            }
        }
//
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(name,password, new ArrayList<>());
//        return authenticationToken;
        return new UsernamePasswordAuthenticationToken(
                name, password, new ArrayList<>());
    }


    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }



}
