package com.personal.finance.tracker.demo.appUser.controller;

import com.personal.finance.tracker.demo.appUser.model.AppUser;
import com.personal.finance.tracker.demo.appUser.model.LoginRequest;
import com.personal.finance.tracker.demo.appUser.model.RegisterRequest;
import com.personal.finance.tracker.demo.appUser.model.Token;
import com.personal.finance.tracker.demo.appUser.service.AuthService;
import com.personal.finance.tracker.demo.exception.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody LoginRequest loginRequest) throws NotFoundException {
        Token token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<AppUser> register(@RequestBody RegisterRequest registerRequest) {
        AppUser newUser = authService.register(registerRequest.getUsername(), registerRequest.getEmail(), registerRequest.getPassword());
        return ResponseEntity.ok(newUser);
    }
}
