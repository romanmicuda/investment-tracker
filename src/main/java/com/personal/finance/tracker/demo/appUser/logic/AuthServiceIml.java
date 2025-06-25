package com.personal.finance.tracker.demo.appUser.logic;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.appUser.data.AppUserRepository;
import com.personal.finance.tracker.demo.appUser.data.Token;
import com.personal.finance.tracker.demo.exception.IllegalOperationException;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceIml implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceIml(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                            AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AppUser register(String username, String email, String password) throws IllegalOperationException {
        if (appUserRepository.findByUsername(username).isPresent()) {
            throw new IllegalOperationException("Username already exists");
        }
        AppUser user = new AppUser();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        return appUserRepository.save(user);
    }

    @Override
    public Token login(String username, String password) throws NotFoundException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new NotFoundException("Invalid username or password");
        }
        Token token = new Token(jwtUtil.generateToken(username));
        return token; 
    }
    
}
