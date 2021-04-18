package com.example.serveonspot.user;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<AppUser> userOptional = appUserRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            AppUser user = userOptional.get();

            return User.withUsername(user.getUsername())
                    .password(user.getPassword())
                    .authorities(user.getAuthority())
                    .build();
        }
        throw new UsernameNotFoundException("username not found");
    }

    public AppUser loadAppUserByUsername(String username) throws UsernameNotFoundException {

        Optional<AppUser> userOptional = appUserRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        throw new UsernameNotFoundException("User not found");
    }
}
