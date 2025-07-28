package com.personal.finance.tracker.demo.user.web.bodies;

import java.util.UUID;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
}
