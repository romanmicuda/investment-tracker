package com.personal.finance.tracker.demo.appUser.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.personal.finance.tracker.demo.appUser.model.AppUser;
import com.personal.finance.tracker.demo.appUser.model.Token;
import com.personal.finance.tracker.demo.appUser.security.JwtUtil;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.appUser.repository.AppUserRepository;
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
    public AppUser register(String username, String email, String password) {
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
            throw new NotFoundException();
        }
        Token token = new Token(jwtUtil.generateToken(username));
        return token; 
    }
    
}
