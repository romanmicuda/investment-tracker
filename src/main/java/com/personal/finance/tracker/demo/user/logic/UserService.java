package com.personal.finance.tracker.demo.user.logic;

import com.personal.finance.tracker.demo.exception.IllegalOperationException;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.user.data.User;
import com.personal.finance.tracker.demo.user.web.bodies.ChangePasswordRequest;

public interface UserService {
    User changePassword(User user, ChangePasswordRequest request) throws IllegalOperationException, NotFoundException ;
}
