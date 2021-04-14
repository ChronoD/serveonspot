package com.example.serveonspot.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomAuthenticationProvider authProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
//                .antMatchers("/specialists/**").permitAll()
//                .antMatchers(HttpMethod.POST, "/customers").permitAll()
//                .antMatchers("/customers/**").permitAll()
//                .antMatchers("/console/**").permitAll()
//                .antMatchers("/register").authenticated()
//                .anyRequest().authenticated()
                .antMatchers("/").permitAll()
                .antMatchers("/api/").permitAll()
                .antMatchers("/api/**").permitAll()
                .and()
                .httpBasic()
                .and()
                .headers().frameOptions().disable()
                .and()
                .csrf().disable();
    }

//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) {
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(userDetailsService());
//        authProvider.setPasswordEncoder(passwordEncoder());
//        auth.authenticationProvider(authProvider);
//    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }


}