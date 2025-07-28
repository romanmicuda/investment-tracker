package com.personal.finance.tracker.demo.user.web;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personal.finance.tracker.demo.exception.IllegalOperationException;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.user.data.User;
import com.personal.finance.tracker.demo.user.logic.UserProviderService;
import com.personal.finance.tracker.demo.user.logic.UserService;
import com.personal.finance.tracker.demo.user.web.bodies.ChangePasswordRequest;
import com.personal.finance.tracker.demo.user.web.bodies.UserResponse;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private UserProviderService userProviderService;

    public UserController(UserService userService, UserProviderService userProviderService) {
        this.userService = userService;
        this.userProviderService = userProviderService;
    }

    @PutMapping("/changePassword")
    public ResponseEntity<UserResponse> changePassword(@RequestBody ChangePasswordRequest request) throws IllegalOperationException, NotFoundException  {
        User user = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));
        userService.changePassword(user, request);
        return ResponseEntity.ok(new UserResponse(user));
    }
}
