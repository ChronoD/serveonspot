package com.example.serveonspot.controllers;

import com.example.serveonspot.repositories.AppUserRepository;
import com.example.serveonspot.services.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping
public class UserController {

    private final AppUserRepository appUserRepository;
    private final AppUserService appUserService;

    public UserController(AppUserRepository appUserRepository, AppUserService appUserService
    ) {
        this.appUserRepository = appUserRepository;
        this.appUserService = appUserService;
    }


//    @PostMapping("/login")
//    public String logIn() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        auth.getAuthorities().stream().forEach(a -> System.out.println(a.getAuthority()));
//        return "yes";
//    }

    @PostMapping("/register")
    public ResponseEntity<UserDetails> reg(Principal principal) {
        UserDetails user = appUserService.loadUserByUsername(principal.getName());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
