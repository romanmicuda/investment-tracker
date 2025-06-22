package com.personal.finance.tracker.demo.appUser.service;

import org.aspectj.weaver.ast.Not;

import com.personal.finance.tracker.demo.appUser.model.AppUser;
import com.personal.finance.tracker.demo.appUser.model.Token;
import com.personal.finance.tracker.demo.exception.IllegalOperationException;
import com.personal.finance.tracker.demo.exception.NotFoundException;

public interface AuthService {
    
    AppUser register(String username, String email, String password) throws IllegalOperationException;

    Token login(String username, String password) throws NotFoundException;
}
