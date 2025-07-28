package com.personal.finance.tracker.demo.user.web.bodies;

import java.util.UUID;

import com.personal.finance.tracker.demo.user.data.User;

import lombok.Data;

@Data
public class UserResponse {

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
    private UUID id;
    private String username;
    private String email;
}
