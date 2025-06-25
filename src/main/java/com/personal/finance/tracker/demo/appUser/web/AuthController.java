package com.personal.finance.tracker.demo.appUser.web;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.appUser.data.Token;
import com.personal.finance.tracker.demo.appUser.logic.AuthService;
import com.personal.finance.tracker.demo.appUser.web.bodies.LoginRequest;
import com.personal.finance.tracker.demo.appUser.web.bodies.RegisterRequest;
import com.personal.finance.tracker.demo.exception.IllegalOperationException;
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
    public ResponseEntity<AppUser> register(@RequestBody RegisterRequest registerRequest) throws IllegalOperationException {
        AppUser newUser = authService.register(registerRequest.getUsername(), registerRequest.getEmail(), registerRequest.getPassword());
        return ResponseEntity.ok(newUser);
    }
}
