package com.example.serveonspot.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
//                .antMatchers("/specialists/**").permitAll()
//                .antMatchers(HttpMethod.POST, "/customers").permitAll()
                .antMatchers("/appointments/**").permitAll()
//                .antMatchers("/console/**").permitAll()
                .antMatchers("/register").permitAll()
//                .anyRequest().authenticated()
                .antMatchers("/").permitAll()
                .antMatchers("/**").permitAll()
                .and()
                .httpBasic().authenticationEntryPoint(customBasicAuthenticationEntryPoint())
                .and()
                .headers().frameOptions().disable()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("1").password("{noop}1").authorities("1")
                .and()
                .withUser("5").password("{noop}5").authorities("5")
                .and()
                .withUser("9").password("{noop}9").authorities("5")
                .and()
                .withUser("admin")
                .password("{noop}admin").credentialsExpired(true).accountExpired(true).accountLocked(true)
                .authorities("APPOINTMENT_LIST").roles("ADMIN");
    }

    @Bean
    public AuthenticationEntryPoint customBasicAuthenticationEntryPoint() {
        return new CustomBasicAuthenticationEntryPoint();
    }
}