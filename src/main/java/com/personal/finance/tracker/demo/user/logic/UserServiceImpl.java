package com.personal.finance.tracker.demo.user.logic;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.exception.IllegalOperationException;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.user.data.User;
import com.personal.finance.tracker.demo.user.data.UserRepository;
import com.personal.finance.tracker.demo.user.web.bodies.ChangePasswordRequest;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }
    @Override
    public User changePassword(User user, ChangePasswordRequest request) throws IllegalOperationException, NotFoundException {
        if (!encoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new IllegalOperationException("Old password is incorrect");
        }
        user.setPassword(encoder.encode(request.getNewPassword()));
        return userRepository.save(user);
    }
    
}
