package com.personal.finance.tracker.demo.appUser.model;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;

}
