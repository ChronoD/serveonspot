package com.example.serveonspot.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(allowedHeaders = "*")
public class UserController {

    private final AppUserService appUserService;

    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping
    public ResponseEntity<AppUser> getUser(Principal principal) {
        Optional<AppUser> appUserOptional = appUserService.loadAppUserByUsername(principal.getName());
        if (appUserOptional.isPresent()) {
            return new ResponseEntity<>(appUserOptional.get(), HttpStatus.OK);
        }
        throw new RuntimeException("Bad credentials");
    }
}