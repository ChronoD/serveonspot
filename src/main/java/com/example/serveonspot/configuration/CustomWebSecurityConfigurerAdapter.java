package com.example.serveonspot.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET,"/customers").authenticated()
                .antMatchers("/customers/**").permitAll()
                .antMatchers(HttpMethod.GET,"/specialists").permitAll()
                .antMatchers("/specialists/**")
                .authenticated()

//             .hasRole("MANAGER")
                .and()
                .httpBasic()
                .and()
                .csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.inMemoryAuthentication()
                .withUser("10")
                .password("{noop}10")
                .roles("SPECIALIST")
                .and()
                .withUser("25")
                .password("{noop}25")
                .roles("SPECIALIST")
                .and()
                .withUser("45")
                .password("{noop}45")
                .roles("SPECIALIST")
                .and()
                .withUser("manager")
                .password("{noop}manager")
                .roles("MANAGER");
    }

}