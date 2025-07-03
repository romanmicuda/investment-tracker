package com.personal.finance.tracker.demo.user.logic;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.user.data.User;
import com.personal.finance.tracker.demo.user.data.UserRepository;

@Service
public class UserProviderService {
    
    private final UserRepository userRepository;
    
    public UserProviderService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && 
            authentication.getPrincipal() instanceof UserDetailsImpl) {
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            return userRepository.findByUsername(userDetails.getUsername());
        }
        return Optional.empty();
    }
}