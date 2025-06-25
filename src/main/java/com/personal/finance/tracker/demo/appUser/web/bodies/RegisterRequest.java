package com.personal.finance.tracker.demo.appUser.web.bodies;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;

}
