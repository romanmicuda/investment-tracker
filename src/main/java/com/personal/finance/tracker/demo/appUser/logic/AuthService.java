package com.personal.finance.tracker.demo.appUser.logic;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.appUser.data.Token;
import com.personal.finance.tracker.demo.exception.IllegalOperationException;
import com.personal.finance.tracker.demo.exception.NotFoundException;

public interface AuthService {
    
    AppUser register(String username, String email, String password) throws IllegalOperationException;

    Token login(String username, String password) throws NotFoundException;
}
