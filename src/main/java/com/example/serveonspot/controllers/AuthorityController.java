package com.example.serveonspot.controllers;

import com.example.serveonspot.entities.AppUser;
import com.example.serveonspot.services.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping
@CrossOrigin(allowedHeaders = "*")
public class AuthorityController {

    private final AppUserService appUserService;

    public AuthorityController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/user")
    public ResponseEntity<AppUser> reg(Principal principal) {
        AppUser appUser = appUserService.loadAppUserByUsername(principal.getName());
        return new ResponseEntity<>(appUser, HttpStatus.OK);
    }
}
