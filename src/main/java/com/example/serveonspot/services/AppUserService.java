package com.example.serveonspot.services;

import com.example.serveonspot.entities.AppUser;
import com.example.serveonspot.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserService implements UserDetailsService {
    private AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository){
        this.appUserRepository=appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<AppUser> user = appUserRepository.findByAppUsername(username);
        if (user.isPresent()) {
            AppUser u= user.get();

            return User.withUsername(u.getUsername())
                    .password(u.getPassword())
                    .roles(u.getRole())
                    .build();
        }
        throw new UsernameNotFoundException("username not found");
    }
}
