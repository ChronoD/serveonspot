package com.example.serveonspot.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(allowedHeaders = "*")
public class AuthorityController {

    @GetMapping("/authorities")
    public ResponseEntity<List<GrantedAuthority>> reg(Authentication authentication) {
        return new ResponseEntity(authentication.getAuthorities(), HttpStatus.OK);
    }
}
